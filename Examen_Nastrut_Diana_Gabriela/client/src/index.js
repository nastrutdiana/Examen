import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from "react-router-dom";
import './index.css';

import Board from './Board';
import MeetingForm from './MeetingForm';
import ParticipantForm from './ParticipantForm';



ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Board />} />
      <Route element={<MeetingForm />} />
      <Route element={<ParticipantForm />} />
    </Routes>
  </HashRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();


