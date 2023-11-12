import { useState } from 'react';
import { createUserProfile } from '../../../utils/backend';
import { useNavigate } from 'react-router-dom';

export default function NewUser() {
  const [formData, setFormData] = useState({ email: '', username: '', password: '', city: ''  });
  const [emergencyServices, setEmergencyServices] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    setFormData(prev => ({ ...prev, [event.target.name]: event.target.value }));
  }

  function searchEmergencyServices() {
    fetch(`http://localhost:3000/api/csv?city=${encodeURIComponent(formData.city)}`)
    .then(response => response.json()) 
          
    .then(data => {
        console.log(data) 
        setEmergencyServices(data);
      })
      .catch(err => console.error('Error searching:', err));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const userProfileData = { ...formData, emergencyService: emergencyServices };
    createUserProfile(userProfileData)
      .then(newUser => {
        navigate(`/users/userprofile/${newUser._id}`);
      })
      .catch(error => console.error('Error creating user:', error));
  }
  return (
    <div className="new-user-container">
      <h1>Create New User</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Your email" value={formData.email} onChange={handleInputChange} />
        <br />
        <input name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} />
        <br />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
        <br />
        <input name="city" placeholder="City for Emergency Services" value={formData.city} onChange={handleInputChange} />
        <button type="button" onClick={searchEmergencyServices}>Search Emergency Services</button>
        <br />
        {emergencyServices && (
    <div>
        <h2>Emergency Services in {formData.city}</h2>
        <ul>
            {emergencyServices.map((service, index) => (
                <li key={index}>
                    <p>Name: {service.name}</p>
                    <p>Address: {service.address}</p>
                    <p>City: {service.city}</p>
                    <p>State: {service.state}</p>
                    <p>Telephone: {service.telephone}</p>
                    <p>County: {service.county}</p>
                </li>
            ))}
        </ul>
    </div>
)}
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
