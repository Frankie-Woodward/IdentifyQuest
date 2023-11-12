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
        <p className="user-element">{user.email}</p>
        <p className="user-element">{user.username}</p>

        <div className="user-local-emerg">
            {user.emergencyService.map((item, index) => (
                <div key={item._id || index} className="emerge-item">
                    <p>Local 911 Services: {item.name}</p>
                    <p>Date Added: {new Date(item.createdOn).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
        <div className="user-evidence">
            {user.evidence.map((item, index) => (
                <div key={item._id || index} className="evidence-item">
                    <p>Suspect Details: {item.suspectDetails}</p>
                    <img src={item.image_url} alt="Suspect" />
                    <p>Date Added: {new Date(item.createdOn).toLocaleDateString()}</p>
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
      <h1>User Profile</h1>
      <h2>Edit Profile</h2>
      {userProfileElement}
    </div>
  );
}
