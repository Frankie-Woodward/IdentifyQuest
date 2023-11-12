import axios from 'axios';

export async function getUserProfile(userId) {
    const  {data} = await axios.get(`/api/users/${userId}`);
    return data;
  }
export async function getUsers() {
    const { data } = await axios.get('/api/users');
    return data;
}  
export async function createUserProfile(profileData) {
  const {data} = await axios.post('/api/users/new', profileData);
  return data;
}


export async function updateUserProfile(profileData, userId) {
  const  {data} = await axios.put(`/api/users/${userId}`, profileData);
  return data;
}

export async function deleteUserProfile(userId) {
  const  {data} = await axios.delete(`/api/users/${userId}`);
  return data;
}
