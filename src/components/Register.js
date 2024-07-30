

import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "../config/axios";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import register from "../Assests/register.jpg"

const registerValidationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(3).max(30),
    confirmPassword: yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([yup.ref('password')]) : field
    ),
    role: yup.string().required("Please select a role")
});

export default function Register() {
    const navigate = useNavigate();
    const [serverErrors, setServerErrors] = useState("");

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: ""
        },
        validateOnChange: false,
        validationSchema: registerValidationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post("/signup", values);
                console.log(response.data);
                navigate("/login");
            } catch (e) {
                setServerErrors(e.response.data.errors);
            }
        }
    });

    const backgroundStyle = {
        backgroundImage: `url(${register})`, // Use the imported image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    // Form container style
    const formContainerStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '500px',
        width: '100%'
    };

    return (
        <div style={backgroundStyle}>
            <div style={formContainerStyle}>
                <h1 className="text-center">Sign Up!!!</h1>
                {serverErrors && <div className="alert alert-danger">{serverErrors}</div>}
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Enter the Name of the Centre/Hospital</label>
                        <input 
                            type="text"
                            value={formik.values.name}
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            className="form-control"
                        />
                        {formik.errors.name && <div className="text-danger">{formik.errors.name}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Enter Email</label>
                        <input 
                            type="email"
                            value={formik.values.email}
                            name="email"
                            id="email"
                            onChange={formik.handleChange}
                            className="form-control"
                        />
                        {formik.errors.email && <div className="text-danger">{formik.errors.email}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Enter Password</label>
                        <input 
                            type="password"
                            value={formik.values.password}
                            name="password"
                            id="password"
                            onChange={formik.handleChange}
                            className="form-control"
                        />
                        {formik.errors.password && <div className="text-danger">{formik.errors.password}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input 
                            type="password"
                            value={formik.values.confirmPassword}
                            name="confirmPassword"
                            id="confirmPassword"
                            onChange={formik.handleChange}
                            className="form-control"
                        />
                        {formik.errors.confirmPassword && <div className="text-danger">{formik.errors.confirmPassword}</div>}
                    </div>

                    <div className="form-group">
                        <label>Select a Role</label><br/>
                        <div className="form-check form-check-inline">
                            <input 
                                type="radio" 
                                value="Centre" 
                                onChange={formik.handleChange} 
                                checked={formik.values.role === 'Centre'}  
                                id="Centre" 
                                name="role"
                                className="form-check-input"
                            /> 
                            <label htmlFor="Centre" className="form-check-label">Centre</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input 
                                type="radio" 
                                value="Hospital" 
                                onChange={formik.handleChange} 
                                checked={formik.values.role === 'Hospital'}  
                                id="Hospital" 
                                name="role"
                                className="form-check-input"
                            /> 
                            <label htmlFor="Hospital" className="form-check-label">Hospital</label>
                        </div>
                        {formik.errors.role && <div className="text-danger">{formik.errors.role}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        </div>
    );
}
