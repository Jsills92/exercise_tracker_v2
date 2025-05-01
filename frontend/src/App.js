import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateUser from './components/CreateUser';
import CreateExercise from './components/CreateExercise';
import ExerciseLog from './components/ExerciseLog';
import Home from './components/Home'; // Create a Home component
import './App.css'; // Ensure this import is in your main entry file


function App() {
  return (
    <Router>
      <div className="App">
        <h1>Exercise Tracker</h1>
        <nav>
          <ul>
            <li><Link to="/create-user">Create User</Link></li>
            <li><Link to="/create-exercise">Create Exercise</Link></li>
            <li><Link to="/logs">Exercise Logs</Link></li>
            {/* Add more links here for other pages */}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />  {/* Add a Home route */}
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/create-exercise" element={<CreateExercise />} />
          <Route path="/logs" element={<ExerciseLog />} />
          {/* Add more routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
