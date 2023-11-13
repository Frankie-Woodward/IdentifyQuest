import { useRef, useState, useEffect } from "react";
import './styles.css'
import Herme from '../Assets/Herme.JPG'
import { Link, useParams, useLocation } from "react-router-dom"
import PropTypes from 'prop-types';
import { updateUserProfile, getUserProfile } from "../../../utils/backend";

SketchAi.propTypes = {
  onImageURLChange: PropTypes.func,
  suspectDetails: PropTypes.string
};


export default function SketchAi({ onImageURLChange, suspectDetails }) {
    const [image_url, setImage_url] = useState(Herme);
    let inputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [isRestrictedUser, setIsRestrictedUser] = useState(false);
    const { userId } = useParams(); // If using URL parameters
    const location = useLocation(); // Get the current location

    
    console.log('onImageURLChange prop:', onImageURLChange);


    useEffect(() => {
        setIsRestrictedUser(userId === 'restrictedUserId');
    }, [userId]);

    useEffect(() => {
        
      if (suspectDetails) {
        imageGenerator(suspectDetails);
        console.log('New image URL:', suspectDetails);
      }
  }, [suspectDetails]); 

    const imageGenerator = async (details) => {
        try {
            if (!details && !inputRef.current.value) {
                alert("Here is a sketch of the suspect based on your description");
                return;
            }
            setLoading(true);
            const detailText = details || inputRef.current.value;
            const detectivePrompt = `You are a detective. You will be given details of a suspect. Your job is to use these details to sketch an image of the suspect and provide a real life image. Details: ${detailText}`;
            
            const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
            
            const description = await fetch('https://api.openai.com/v1/images/generations', {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                prompt: detectivePrompt,
                n: 1,
                size: "1024x1024",
                }),
            });
        if (!description.ok) {
                // If the response is not ok, throw an error with the status
                throw new Error(`HTTP error! status: ${description.status}`);
            }

        const data = await description.json();
        console.log('Fetched image data:', data);

        if (data && data.data && data.data.length > 0) {
          const newImageURL = data.data[0].url;
          setImage_url(newImageURL); // Update the local state
          console.log('New image URL after fetch:', newImageURL);

          // Call the onImageURLChange function passed as prop with the new URL
          if (typeof onImageURLChange === 'function') {
              onImageURLChange(newImageURL);
          } else {
              console.error('onImageURLChange is not a function or not provided.');
          }

      } else {
          throw new Error('No image data received.');
      }
  } catch (error) {
      alert('Error generating image: ' + error.message);
  } finally {
      setLoading(false);
  }
};
const handleSave = async () => {
    try {
        // Fetch the current user profile
        const currentUserProfile = await getUserProfile(userId);
        if (!currentUserProfile) {
            throw new Error('User profile not found');
        }

        // Prepare the new evidence data
        const newEvidence = {
            image_url: image_url,
            suspectDetails: suspectDetails
        };

        // Append the new evidence to the existing array
        const updatedEvidenceArray = [...currentUserProfile.evidence, newEvidence];

        // Prepare the updated user profile data, including the updated evidence array
        const updatedProfileData = {
            ...currentUserProfile, // Spread the rest of the user properties
            evidence: updatedEvidenceArray // Updated evidence array
        };

        // Update the user's profile with the new data
        const updatedProfile = await updateUserProfile(updatedProfileData, userId);
        console.log('Profile updated successfully with new evidence:', updatedProfile);

        // Update your local user object if necessary
        // user = updatedProfile; // Uncomment and modify this line based on your state management

    } catch (error) {
        console.error('Error updating profile with new evidence:', error);
    }
};
console.log(userId)
const isHomePage = location.pathname === '/';
return (
    <>
        <div className='ai-detective'>
            <div className="header">Sus<span>pect </span>Sketch</div>
            <div className="img-loading">
                <Link to="/evidence">
                    <div className="image"><img src={image_url ? image_url : Herme} alt="Suspect" /></div>
                </Link>
                <div className="loading">
                    <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
                    <div className={loading ? "loading-text" : "display-none"}>Loading....</div>
                </div>
            </div>
            {!isRestrictedUser && isHomePage && (
            <div className="search-box">
            
                <input type="text" ref={inputRef} className="search-input" placeholder='Describe the suspect in great detail'/>
                <div className="generate-btn" onClick={() => imageGenerator(inputRef.current.value)}>Identify</div>
                
            </div>)}
            <button onClick={handleSave}>Save Suspect</button>
        </div>
    </>
);
}