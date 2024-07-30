import React, { useState } from 'react';
import axios from '../config/axios';
import { useParams } from 'react-router-dom';

export default function ResetPassword() {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/reset-password', { token, newPassword });
            setMessage(response.data.message);
        } catch (err) {
            setMessage('An error occurred while resetting the password.');
        }
    };

    return (
        <div>
            <h3>Reset Password</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
