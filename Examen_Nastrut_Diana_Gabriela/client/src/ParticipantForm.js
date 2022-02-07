import { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Form, Modal, Button } from 'react-bootstrap'

function Participants() {

    const [participants, setParticipants] = useState([]);
    const [participant, setParticipant] = useState({
        name: '',
        meetingId: 1
    });
    const [isModalOpen, showModal] = useState(false);
    const [isEditing, setEdit] = useState(false);
    const [count, setCount] = useState(0); // used to refetch data

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/getParticipants`)
            .then((response) => {
                setParticipants(response.data);
            }).catch((error) => {
                console.log(error);
            })
    }, [count]);

    const handleCloseModal = () => {
        setEdit(false);
        showModal(false);
    }

    const handleEdit = (participant) => {
        setParticipant(participant);
        setEdit(true);
        showModal(true);
    }

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setParticipant({...participant, [name]: value});
    }

    const saveParticipant = () => {
        axios.put(`${process.env.REACT_APP_API_URL}/updateParticipant/${participant.id}`, participant)
            .then((response) => {
                handleCloseModal();
                setCount(count + 1);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const addParticipant = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/addParticipant`, participant)
            .then((response) => {
                setParticipant({
                    name: '',
                    meetingId: 1
                });
                handleCloseModal();
                setCount(count + 1);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/deleteParticipant/${id}`)
            .then((response) => {
                handleCloseModal();
                setCount(count + 1);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <>
            <Button variant="primary" onClick={() => showModal(true)}>Add Participant</Button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <td>Meeting ID</td>
                        <td>Actions</td>
                    </tr>
                </thead>
            {
                participants.map(participant => {
                    return (
                        <tr key={participant.id}>
                            <td>{participant.id}</td>
                            <td>{participant.name}</td>
                            <td>{participant.meetingId}</td>
                            <td>
                                <button onClick={() => handleEdit(participant)}>Edit</button>
                                <button onClick={() => handleDelete(participant.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                })
            }
            </Table>
            <Modal show={isModalOpen} onHide={() => handleCloseModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>
                    {isEditing ? `Editing Participant ID: ${participant.id}` : 'Adding new participant'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Add name.." name="name" value={participant.name} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Meeting ID</Form.Label>
                            <Form.Control type="text" placeholder="meetingId" name="meetingId" value={participant.meetingId} onChange={handleInputChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {isEditing ? <Button variant="primary" onClick={saveParticipant}>
                        Save Participant
                    </Button> : <Button variant="primary" onClick={addParticipant}>
                        Add Participant
                    </Button>}
                </Modal.Footer>
            </Modal>
     </>
    )
}

export default Participants;