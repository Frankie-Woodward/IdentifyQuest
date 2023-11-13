import { useState, useEffect } from 'react';
import { getUserProfile, deleteUserProfile, updateUserProfile } from '../../../utils/backend';
import './styles.css';
import { useParams, Link } from 'react-router-dom';

export default function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [formMode, setFormMode] = useState('edit'); // Only 'edit' mode needed
  const [formData, setFormData] = useState({ email: '', username: '', password: '' });
  
  useEffect(() => {
    let isMounted = true;
    if (userId) {
      getUserProfile(userId)
        .then(userData => {
          if (isMounted) {
            setUser(userData);
            setFormData({ email: userData.email, username: userData.username, password: '' });
          }
        })
        .catch(error => console.error('Error fetching user data:', error));
    }
    return () => { isMounted = false; };
  }, [userId]);

  function handleInputChange(event) {
    setFormData(prev => ({ ...prev, [event.target.name]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateUserProfile(formData, user._id)
      .then(() => {
        setFormMode(null);
        refreshUserProfile();
      })
      .catch(error => console.error('Error updating user:', error));
  }

  function handleDelete() {
    if (user && user._id) {
      deleteUserProfile(user._id)
        .then(() => setUser(null))
        .catch(error => console.error('Error deleting user:', error));
    }
  }

  function refreshUserProfile() {
    if (userId) {
      getUserProfile(userId).then(setUser).catch(error => console.error('Error refreshing user:', error));
    }
  }

  let userProfileElement = null;
  if (formMode) {
    userProfileElement = (
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Your email" value={formData.email} onChange={handleInputChange} />
        <br />
        <input name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} />
        <br />
        <button type="submit">Update</button>
      </form>
    );
  } else if (user) {
    userProfileElement = (
      <div className="user-profile">
        <div className="user-info">
          <p className="user-element">{user.email}</p>
          <p className="user-element">{user.username}</p>
        </div>

        {user.emergencyService && (
                <div className="user-local-emerg">
                    <p>Emergency Service Name: {user.emergencyService.name}</p>
                    <p>Address: {user.emergencyService.address}</p>
                    <p>City: {user.emergencyService.city}</p>
                    <p>State: {user.emergencyService.state}</p>
                    <p>Telephone: {user.emergencyService.telephone}</p>
                    <p>County: {user.emergencyService.county}</p>
                    <p>Website: <a href={user.emergencyService.website} target="_blank" rel="noopener noreferrer">{user.emergencyService.website}</a></p>
                </div>
            )}
      <div className="user-evidence">
        {user.evidence.map((item, index) => (
          <div key={item._id || index} className="evidence-item">
            <a href={`#suspect-details-${index}`}>
              <img src={item.image_url} alt="Suspect" />
            </a>
            <div id={`suspect-details-${index}`} className="suspect-details">
              <p>Suspect Details: {item.suspectDetails}</p>
              <p>Date Added: {new Date(item.createdOn).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>


        <button onClick={() => setFormMode('edit')} className="toggle-button">Edit Profile</button>
        <button onClick={handleDelete} className="delete-btn">Delete</button>
        <Link to={{ pathname: `/detective-chat/${user._id}`, state: `${user}` }}>Create New Sketch</Link>
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <h1>Welcome to the Profile of:</h1>
      {user && <h2>{user.username}</h2>} {/* Safely accessing username */}
      {userProfileElement}
    </div>
  );
  
}
