import React, { useState } from 'react';
import axios from '../config/axios';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate=useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/forgot-password', { email });
            setMessage(response.data.message);
            navigate("/login")
        } catch (err) {
            setMessage('An error occurred while sending the reset email.');
        }
    };

    return (
        <div>
            <h3>Forgot Password</h3>
            <form onSubmit={handleSubmit}>
                <label>Email :</label>
                <br/>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br/>
                <br/>
                <input type="submit" value="send"/>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
