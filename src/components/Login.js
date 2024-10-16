import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username) {
      onLogin(username);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Enter your username" 
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
