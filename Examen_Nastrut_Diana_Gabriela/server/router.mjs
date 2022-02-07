import express from 'express';
import { request } from 'http';
import {
    getMeetings, getMeeting, addMeeting, saveMeeting, removeMeeting, updateMeeting,
    getParticipants, getParticipant, addParticipant, saveParticipant, removeParticipant, updateParticipan
} from './service.mjs';

const router = express.Router();

router.route('/meetings')
	.get((request, response) => getMeetings(request, response))
	.post((request, response) => addMeeting(request, response));

router.route('/meetings/:id')
	.get((request, response) => getMeeting(request, response))
	.patch((request, response) => saveMeeting(request, response))
	.put((request, response) => updateMeeting(request, response))
	.delete((request, response) => removeMeeting(request, response));

router.route('/participants')
	.get((request, response) => getParticipants(request, response))
	.post((request, response) => addParticipant(request, response));

router.route('/participants/:id')
	.get((request, response) => getParticipant(request, response))
	.patch((request, response) => saveParticipant(request, response))
	.put((request, response) => updateParticipan(request, response))
	.delete((request, response) => removeParticipant(request, response));


export default router;