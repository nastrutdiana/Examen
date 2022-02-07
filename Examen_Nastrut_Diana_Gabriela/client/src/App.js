import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Participants from './ParticipantForm';
import Meetings from './MeetingForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
					<Navbar />
					<Routes>
						<Route element={<Participants/>} />
						<Route element={<Meetings/>} />
					</Routes>
				</BrowserRouter>
      </header>
    </div>
  );
}

export default App;
