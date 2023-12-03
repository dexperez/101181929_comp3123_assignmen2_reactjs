import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/signup.css';

export default function Signup() {
    const [userCredentials, setUserCredentials] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleUserInput = (e) => {
        const { id, value } = e.target;
        setUserCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleSignUpSubmission = async (e) => {
        e.preventDefault();
        try {
            console.log('User Credentials:', userCredentials); // Add this line for debugging
            await axios.post('http://localhost:8080/api/v1/user/signup', userCredentials);
            window.location.href = '/login';
        } catch (error) {
            console.error('Error encountered during sign-up: ' + error);
        }
    };
    

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUpSubmission}>
                <div className="form-group">
                    <input type="text" id="username" placeholder="Username" onChange={handleUserInput} />
                </div>
                <br />
                <div className="form-group">
                    <input type="text" id="email" placeholder="Email" onChange={handleUserInput} />
                </div>
                <br />
                <div className="form-group">
                    <input type="password" id="password" placeholder="Password" onChange={handleUserInput} />
                </div>
                <br />
                <div className="form-group">
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    );
}
