import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ExerciseLog() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('https://exercisetrackerv2-production.up.railway.app/api/users').then(res => setUsers(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.get(`https://exercisetrackerv2-production.up.railway.app/api/users/${selectedUser}/logs`);
    setLogs(res.data.log || []);
  };

  return (
    <div>
      <h2>Exercise Logs</h2>
      <form onSubmit={handleSubmit}>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
          <option value="">Select user</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>{user.username}</option>
          ))}
        </select>
        <button type="submit">Get Logs</button>
      </form>
      <ul>
        {logs.map((entry, i) => (
          <li key={i}>
            {entry.description} - {entry.duration} min on {new Date(entry.date).toDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExerciseLog;
