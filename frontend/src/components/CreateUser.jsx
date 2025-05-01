import { useState } from 'react';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleCreateUser = async () => {
    try {
      const res = await fetch('https://exercisetrackerv2-production.up.railway.app/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create user');
      }

      setSuccessMessage(`User created: ${data.username}`);
      setError(null);
      setUsername('');
    } catch (err) {
      setError(err.message || 'Failed to create user');
      setSuccessMessage('');
      console.error('❌ Create user error:', err);
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />
      <button onClick={handleCreateUser}>Create User</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default CreateUser;
