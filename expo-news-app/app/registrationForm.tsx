import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: ''
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/register', formData);
            console.log(response.data); // Handle success response
            alert('Registration successful!');
        } catch (error) {
            console.error(error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
                required
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;
