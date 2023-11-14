import { useState } from 'react';
import { createUserProfile } from '../../../utils/backend';
import { useNavigate } from 'react-router-dom';
import './styles.css'

export default function NewUser() {
  const [formData, setFormData] = useState({ email: '', username: '', password: '', city: '', selectedService: '' });
  const [emergencyServices, setEmergencyServices] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    setFormData(prev => ({ ...prev, [event.target.name]: event.target.value }));
  }

  function searchEmergencyServices() {
    fetch(`/api/csv?city=${encodeURIComponent(formData.city)}`)
      .then(response => response.json()) 
      .then(data => {
      console.log(data) 
      setEmergencyServices(data);
    })
    .catch(err => console.error('Error searching:', err));
  }

  function handleServiceChange(event) {
    const selectedService = emergencyServices.find(service => service.name === event.target.value);
    setFormData(prev => ({ ...prev, selectedService }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const userProfileData = { ...formData, emergencyService: formData.selectedService };
    createUserProfile(userProfileData)
      .then(newUser => {
        navigate(`/users/userprofile/${newUser._id}`);
      })
      .catch(error => console.error('Error creating user:', error));
  }

  return (
    <div className="new-user-container">
      <h1>Create New User</h1>
      <form onSubmit={handleSubmit} className='new-user-form'>
        <input name="email" placeholder="Your email" value={formData.email} onChange={handleInputChange} />
        <br />
        <input name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} />
        <br />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
        <br />
        <input name="city" placeholder="City for Emergency Services" value={formData.city} onChange={handleInputChange} />
        <button type="button" onClick={searchEmergencyServices}>Search Emergency Services</button>
        
        {emergencyServices && (
          <div>
            <h2>Select an Emergency Service in {formData.city}</h2>
            <select name="selectedService" onChange={handleServiceChange} value={formData.selectedService?.name || ''}>
                {emergencyServices.map((service, index) => (
                    <option key={index} value={service.name}>
                    {service.name}
                    </option>
                ))}
                </select>
          </div>
        )}

        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
