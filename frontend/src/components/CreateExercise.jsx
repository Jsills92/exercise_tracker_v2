import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateExercise() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    userId: '',
    description: '',
    duration: '',
    date: '',
  });
  const [responseMsg, setResponseMsg] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('https://exercisetrackerv2-production.up.railway.app/api/users');
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://exercisetrackerv2-production.up.railway.app/api/users/${formData.userId}/exercises`, {
        description: formData.description,
        duration: parseInt(formData.duration),
        date: formData.date,
      });
      setResponseMsg(`Exercise added for ${res.data.username}`);
    } catch (err) {
      console.error(err);
      setResponseMsg('Failed to add exercise');
    }
  };

  return (
    <div>
      <h2>Create Exercise</h2>
      <form onSubmit={handleSubmit}>
        <select name="userId" value={formData.userId} onChange={handleChange} required>
          <option value="">Select user</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>{user.username}</option>
          ))}
        </select>
        <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
        <input type="number" name="duration" placeholder="Duration (min)" onChange={handleChange} required />
        <input type="date" name="date" onChange={handleChange} required />
        <button type="submit">Add Exercise</button>
      </form>
      {responseMsg && <p>{responseMsg}</p>}
    </div>
  );
}

export default CreateExercise;
