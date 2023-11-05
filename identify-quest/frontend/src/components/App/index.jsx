import './styles.css';
import { useState, useEffect } from 'react';
// import { Routes, Route, Link } from "react-router-dom";
import Sketch from '../Sketch';
import DetectiveChat from '../DetectiveChat';
// import HomePage from '../HomePage';


export default function App() {
  const [suspectDetails, setSuspectDetails] = useState('');

  const handleSuspectDetails = (details) => {
    setSuspectDetails(details);
  };
 

  return (
    <>
    <DetectiveChat onDetailsSubmit={handleSuspectDetails} />
      <div><Sketch suspectDetails={suspectDetails}/></div>
    </>
  )
}


