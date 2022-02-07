import {useState, useEffect} from 'react';
import MeetingRow from './MeetingRow';

function Board() {
  const [meetings, setMeetings] = useState([]);
  const loadMeetings = async () => {
    const response = await fetch ('/api/meetings');
    if (response.status === 200) {
        setMeetings(await response.json());
    }
  };
  useEffect(() => loadMeetings(), []);
  return (
  <div className="container">
    {
      meetings.map((meeting, index) => <MeetingRow key={index} meeting={meeting} index={index} width={100 / meetings.length - 1} />)
    }
  </div>
  )
}

export default Board;
