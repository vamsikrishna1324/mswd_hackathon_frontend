import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default to user login
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    let url = 'http://localhost:5000/login'; // Default URL for user login
    if (role === 'admin') {
      url = 'http://localhost:5000/admin-login'; // Admin login URL
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Debugging log
      console.log('Login Response:', data);

      if (response.status === 200) {
        // Store user data in localStorage for normal user or admin
        localStorage.setItem('user', JSON.stringify(data.user || { email }));
        navigate('/home'); // Redirect to home page after successful login
      } else {
        setErrorMessage(data.error); // Show error message
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Error logging in');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="radio"
              value="user"
              checked={role === 'user'}
              onChange={() => setRole('user')}
            />{' '}
            Login as User
          </label>
          <label>
            <input
              type="radio"
              value="admin"
              checked={role === 'admin'}
              onChange={() => setRole('admin')}
            />{' '}
            Login as Admin
          </label>
        </div>
        <button type="submit">Login</button>
      </form>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default Login;
