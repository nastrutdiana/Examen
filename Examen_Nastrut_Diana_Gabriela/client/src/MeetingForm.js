import { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Button, Modal, Form } from 'react-bootstrap'

function Meetings() {

    const [meetings, setMeetings] = useState([]);
    const [meeting, setMeeting] = useState({
        description: '',
        url: ''
    });
    const [searchText, setSearchText] = useState('');
    const [isModalOpen, showModal] = useState(false);
    const [isEditing, setEdit] = useState(false);
    const [sorting, setSorting] = useState('ASC');
    const [count, setCount] = useState(0); // used to refetch data

    useEffect(() => {
        if (searchText.length > 0) {
            axios.get(`${process.env.REACT_APP_API_URL}/searchMeetings?searchTerm=${searchText}`).then((response) => {
                setMeetings(response.data);
            }, (error) => {
                console.log(error);
            })
        } else {
            axios.get(`${process.env.REACT_APP_API_URL}/getMeetings`).then((response) => {
                setMeetings(response.data);
            }, (error) => {
                console.log(error);
            })
        }
    }, [count, searchText]);

    useEffect(() => {
        if (searchText.length > 0) {
            axios.get(`${process.env.REACT_APP_API_URL}/searchMeetings?searchTerm=${searchText}&order=${sorting}`).then((response) => {
                setMeetings(response.data);
            }, (error) => {
                console.log(error);
            })
        }
    }, [sorting, searchText]) //when sorting (asc, desc) changes

    const handleCloseModal = () => {
        setEdit(false);
        showModal(false);
    }

    const handleEdit = (meeting) => {
        setMeeting(meeting);
        setEdit(true);
        showModal(true);
    }

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setMeeting({...meeting, [name]: value});
    }

    const saveMeeting = () => {
        axios.put(`${process.env.REACT_APP_API_URL}/updateMeeting/${meeting.id}`, meeting)
            .then((response) => {
                handleCloseModal();
                setCount(count + 1);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const addMeeting = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/addMeeting`, meeting)
            .then((response) => {
                setMeeting({
                    description: '',
                    url: ''
                });
                handleCloseModal();
                setCount(count + 1);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/deleteMeeting/${id}`)
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
            <Button variant="primary" onClick={() => showModal(true)}>Add Meeting</Button>
            <Form>
                <Form.Group className="mb-3">
                    {/* <Form.Label>Description</Form.Label> */}
                    <Form.Control type="text" placeholder="Search..." value={ searchText } onChange={(e) => setSearchText(e.target.value)} />
                </Form.Group>
                <Form.Group>    
                    <Form.Control as="select" value={sorting} onChange={e => {
                        setSorting(e.target.value)
                    }}>
                        <option value="ASC">ASC</option>
                        <option value="DESC">DESC</option>
                    </Form.Control>
                </Form.Group>
            </Form>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Description</th>
                        <td>URL</td>
                        <td>Actions</td>
                    </tr>
                </thead>
            {
                 meetings.map( meeting => {
                    return (
                        <tr key={ meeting.id}>
                            <td>{ meeting.id}</td>
                            <td>{ meeting.description}</td>
                            <td>{ meeting.url}</td>
                            <td>
                                <button onClick={() => handleEdit( meeting)}>Edit</button>
                                <button onClick={() => handleDelete( meeting.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                })
            }
            </Table>
            <Modal show={isModalOpen} onHide={() => handleCloseModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {isEditing ? `Editing Meeting ID: ${meeting.id}` : 'Adding new meeting'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Add description.." name="description" value={ meeting.description} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>URL</Form.Label>
                            <Form.Control type="text" placeholder="Add url..." name="url" value={meeting.url} onChange={handleInputChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {isEditing ? <Button variant="primary" onClick={saveMeeting}>
                        Save Meeting
                    </Button> : <Button variant="primary" onClick={addMeeting}>
                        Add Meeting
                    </Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Meetings;