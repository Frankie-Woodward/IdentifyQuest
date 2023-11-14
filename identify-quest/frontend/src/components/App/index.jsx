import './styles.css';
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import UserProfile from '../UserProfile';
import DetectiveChat from '../DetectiveChat';
import HomePage from '../HomePage';
import SketchAi from '../SketchAi';
import Users from '../Users';
import NewUser from '../NewUser';
import logo from '../../components/Assets/logo.jpg';
import AboutPage from '../AboutPage';

export default function App() {
  const [imageURL, setImageURL] = useState([]);
  const [suspectDetails, setSuspectDetails] = useState({});

  useEffect(() => {
    console.log(imageURL); // This will log the updated state after re-render
  }, [imageURL]); // The effect will only run when imageURL changes
  
  useEffect(() => {
    console.log(suspectDetails); // This will log the updated state after re-render
  }, [suspectDetails]); // The effect will only run when suspectDetails changes
  

  const handleImageURLChange = (newURL) => {
    
    setImageURL(newURL);
  };

  const handleSuspectDetails = (details) => {
    setSuspectDetails(details);

    
  };  console.log('handleImageURLChange function:', handleImageURLChange);

 
  return (
    <>
    
      <nav className="navbar bg-dark border-bottom border-body" id="thenav" data-bs-theme="dark">
        <div className="container-fluid">
        
          <Link className="navbar-brand" to="/"><img className="logo" src={logo} alt="Logo" />  Identify Quest</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link" to="/users/userprofile/:userId">Profile</Link>
              <Link className="nav-link" to="/users">All Users</Link>
              <Link className="nav-link" to="/new-user">Join Us!</Link>
              <Link className="nav-link" to="/about-page">About Us</Link>
            </div>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users/userprofile/:userId" UserProfile={UserProfile} element={<UserProfile />}/>
        <Route path="/detective-chat/:userId" element={<DetectiveChat onImageURLChange={handleImageURLChange} onDetailsSubmit={handleSuspectDetails}  />} />
        <Route path="/sketch-ai/:userId" element={<SketchAi suspectDetails={typeof suspectDetails === 'object' ? JSON.stringify(suspectDetails) : suspectDetails}
/>
} />
       <Route path="/users" element={<Users />} />
       <Route path="/new-user" element={<NewUser />} />
       <Route path="/about-page" element={<AboutPage />} />
      </Routes>
    </>
  );
}


