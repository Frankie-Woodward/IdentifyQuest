import React, { useState, useEffect } from 'react';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({
    email: '',
    username: '',
    password: '',
    crime_location: '',
    emergency_contacts: '',
    sketch: '',
  });


  useEffect(() => {
  
    const userData = {
      email: '',
      username: '',
      password: '', 
      crime_location: '',
      emergency_contacts: '',
      sketch: '',
    };

    setUser(userData);
  }, []);

  const handleEdit = () => {
    setEditFormData(user);
    setShowEditForm(true);
  };

  const handleSave = () => {
    // Here you would send the data to the server to update the user profile
    console.log('Saved data', editFormData);
    setUser(editFormData);
    setShowEditForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      {showEditForm ? (
        <form>
          <input
            type="email"
            name="email"
            value={editFormData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="username"
            value={editFormData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={editFormData.password}
            onChange={handleChange}
          />
          <input
            type="text"
            name="crime_location"
            value={editFormData.crime_location}
            onChange={handleChange}
          />
          <input
            type="text"
            name="emergency_contacts"
            value={editFormData.emergency_contacts}
            onChange={handleChange}
          />
          <input
            type="text"
            name="sketch"
            value={editFormData.sketch}
            onChange={handleChange}
          />
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </form>
      ) : (
        <div>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
          <p>Password: {user.password}</p>
          <p>Crime Location: {user.crime_location}</p>
          <p>Emergency Contacts: {user.emergency_contacts}</p>
          <p>Sketch: {user.sketch}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
}
