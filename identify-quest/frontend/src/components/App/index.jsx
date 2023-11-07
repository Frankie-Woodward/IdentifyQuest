import './styles.css';
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import UserProfile from '../UserProfile';
import DetectiveChat from '../DetectiveChat';
import HomePage from '../HomePage';
import SketchAi from '../SketchAi';
import Sketch from '../Sketch';

export default function App() {
  const [imageURL, setImageURL] = useState('/');
  const [suspectDetails, setSuspectDetails] = useState('');

  const handleImageURLChange = (newURL) => {
    setImageURL(newURL);
  };

  const handleSuspectDetails = (details) => {
    setSuspectDetails(details);
  };
 
  return (
    <>
    
      <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Identify Quest</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link" aria-current="page" to="/login">Log-in</Link>
              <Link className="nav-link" to="/profile">Profile</Link>
              <Link className="nav-link" to="/SketchAi">Your Sketches</Link>
              <Link className="nav-link" to="/Sketch">The Sketch</Link>
              <Link className="nav-link" to="/detective-chat">Report a Suspect</Link>
            
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/detective-chat" element={<DetectiveChat onDetailsSubmit={handleSuspectDetails} />} />
        <Route path="/sketch-ai" element={<SketchAi onImageURLChange={handleImageURLChange} suspectDetails={suspectDetails} />} />

        <Route path="/sketch" element={<Sketch imageURL={imageURL} />} />
      </Routes>
    </>
  );
}


