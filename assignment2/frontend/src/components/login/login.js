import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/login.css';

const Login = ({ setLoggedInUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loginResponse = await axios.post('http://localhost:8080/api/v1/user/login', {
        username: username,
        password: password
      });

      console.log(loginResponse.data);
      console.log(loginResponse.status);
      console.log(loginResponse.data.username);

      if (loginResponse.data) { // Check if login was successful
        setLoggedInUser({ username: loginResponse.data.username });
        navigate('/employeelist');
      } else {
        setError('Username or password is incorrect');
      }
    } catch (error) {
      console.log("Error occurred during login: " + error);
      setError('Username or password is incorrect.');
    }
  };

  return (
    <div className='login-container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className='form-group'>
          <input type="text" id="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <br />
        <div className='form-group'>
          <input type="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <br />
        <div className='form-group'>
          <button type='submit'>Login</button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
