import Sequelize from 'sequelize';
import {Meeting, Participant} from './repository.mjs'


function order(request) {
	if (request.headers['x-sort']) {
		return request.headers['x-sort'].split(',').reduce((sort, field) => {
			sort.push([field.substring(1), field.charAt(0) === '+' ? 'ASC' : 'DESC']);
			return sort;
		}, []);
	} else {
		return undefined;
	}
}

function where(request) {
	if (request.query.filter) {
		return request.query.filter.split(',').reduce((filter, condition) => {
			let data = condition.split('-');
			filter[data[0]] = {[Sequelize.Op[data[1]]] : data[2]};
			return filter;
		}, {});
	} else {
		return undefined;
	}
}

async function getMeetings(request, response) {
	try {
		const meetings = await Meeting.findAll({
            where: where(request),
			order: order(request)
        });
		if (meetings.length > 0) {
			response.status(200).json(meetings);
		} else {
			response.status(204).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}

async function getMeeting(request, response) {
	try {
		if (request.params.id) {
			const meeting = await Meeting.findByPk(request.params.id);
			if (meeting) {
				response.json(meeting);
			} else {
				response.status(404).send();
			}
		} else {
			response.status(400).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}

async function addMeeting(request, response) {
	try {
		if (request.body.description
			&& request.body.url) {
			await Meeting.create(request.body);
			response.status(201).send();
		} else {
			response.status(400).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}

async function saveMeeting(request, response) {
	try {
		const meeting = await Meeting.findByPk(request.params.id);
		if (meeting) {
			Object.entries(request.body).forEach(([name, value]) => meeting[name] = value);
			await meeting.save();
			response.status(204).send();
		} else {
			response.status(404).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}

async function removeMeeting(request, response) {
	try {
		if (request.params.id) {
			const meeting = await Meeting.findByPk(request.params.id);
			if (meeting) {
				await meeting.destroy();
				response.status(204).send();
			} else {
				response.status(404).send();
			}
		} else {
			response.status(400).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}

async function updateMeeting(request, response){
    try {
			const meeting = await Meeting.findByPk(request.params.id);
			if (meeting) {
				await meeting.update(request.body)
				response.status(204).send();
			} else {
				response.status(404).send();
			}		
	} catch (error) {
		response.status(500).json(error);
	}
}

async function filterMeetings(request, response, next){
    try{
        let filter = request.body.filter ? request.query.filter : ''
        let meetings
        if(filter){
            meetings = await Meeting.findAll({
                where: {
                    brand :{
                        [Op.like] : `%${filter}%`
                    }
                }
            })
        }else{
            meetings = await Meeting.findAll()
        }
        res.status(200).json(meetings)
    }catch(error){
        next(error)
    }
}

const getPaginatedMeetings = async (request, response) => {
    try {
        const noItems = request.query.limit || 20;
        const offset = request.query.offset || 0;
        const meetings = await Meeting.findAndCountAll({
           offset: offset,
           limit: noItems
        });

        return response.status(200).json(meetings);
    } catch(err){
        console.log(err);
        return response.status(500).json(err);
    }
}

async function getParticipants(request, response) {
	try {
		const participants = await Participant.findAll();
		if (participants.length > 0) {
			response.status(200).json(participants);
		} else {
			response.status(204).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}

async function getParticipant(request, response) {
	try {
		if (request.params.id) {
			const participant = await Participant.findByPk(request.params.id);
			if (participant) {
				response.json(participant);
			} else {
				response.status(404).send();
			}
		} else {
			response.status(400).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}

async function addParticipant(request, response) {
	try {
		if (request.body.name) {
			await Participant.create(request.body);
			response.status(201).send();
		} else {
			response.status(400).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}

async function saveParticipant(request, response) {
	try {
		const participant = await Participant.findByPk(request.params.id);
		if (participant) {
			Object.entries(request.body).forEach(([name, value]) => participant[name] = value);
			await participant.save();
			response.status(204).send();
		} else {
			response.status(404).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}

async function updateParticipan(request, response){
    try {
			const participant = await Participant.findByPk(request.params.id);
			if (participant) {
				await participant.update(request.body)
				response.status(204).send();
			} else {
				response.status(404).send();
			}		
	} catch (error) {
		response.status(500).json(error);
	}
}


async function removeParticipant(request, response) {
	try {
		if (request.params.id) {
			const participant = await Participant.findByPk(request.params.id);
			if (participant) {
				await participant.destroy();
				response.status(204).send();
			} else {
				response.status(404).send();
			}
		} else {
			response.status(400).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}


export{
    getMeetings, getMeeting, addMeeting, saveMeeting, removeMeeting, updateMeeting, filterMeetings, getPaginatedMeetings,
    getParticipants, getParticipant, addParticipant, saveParticipant, removeParticipant,updateParticipan

}
