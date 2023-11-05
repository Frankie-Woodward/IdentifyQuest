import './styles.css';
import { useState, useEffect } from 'react';
// import { Routes, Route, Link } from "react-router-dom";

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
   
    </>
  )
}


