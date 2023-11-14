import { useState, useEffect } from 'react';
import UserProfile from '../UserProfile';
import { getUsers } from '../../../utils/backend';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './styles.css';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
        .then(users => setUsers(users))
}, [])

const userElements = users.length > 0 ? users.map(user => (
  <div key={user._id} className="user-profile-link">
    <Link element={<UserProfile user={user} />} to={`/users/userprofile/${user._id}`}>{user.username}</Link> {/* Provide a link to the user profile */}
  </div>
)) : [<p key='0' className='text-center'>No users yet. Be the first to sign up!</p>];
// conditionally display the text of the create form button

console.log(users)
return (
  <div className='all-users'>
    <h1>View All of Our Current Users Below!</h1>

    
  <div className='outer-container'> 
    <div className='users-container'>
      {userElements}
    </div>
  </div>
  </div>
);
}
