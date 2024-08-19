

import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "../config/axios";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import '../App.css'; // Import your custom CSS

const loginValidationSchema = yup.object({
    email: yup.string().required("Email is required").email("Invalid email address"),
    password: yup.string().required("Password is required").min(3, "Password is too short").max(30, "Password is too long")
});

export default function Login() {
    const { dispatch } = useAuth();
    const navigate = useNavigate();
    const [serverErrors, setServerErrors] = useState("");

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginValidationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post("/login", values);
                localStorage.setItem("token", response.data.token);

                const userResponse = await axios.get("/account", {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });

                // Dispatch user data
                dispatch({ type: "LOGIN", payload: { data: userResponse.data } });

                // Check user role and fetch relevant profile data if necessary
                if (userResponse.data.role === 'Centre') {
                    const centreResponse = await axios.get("/showAll", {
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    });

                    // Dispatch center data
                    dispatch({ type: "CENTREPROFILE", payload: { centre: centreResponse.data } });
                    navigate("/dashboard");
                } else if (userResponse.data.role === 'Hospital') {
                    const hospitalResponse = await axios.get("/hospitalShow", {
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    });

                    // Dispatch hospital data
                    dispatch({ type: "HOSPITALPROFILE", payload: { hospital: hospitalResponse.data } });
                    navigate("/dashboard");
                } else {
                    setServerErrors("You don't have permission to access.");
                }
            } catch (e) {
                setServerErrors(e.response?.data?.errors || "Login failed. Please try again.");
            }
        }
    });

    // Form container style
    const formContainerStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '500px',
        width: '100%'
    };

    // Custom CSS for labels
    const customLabelStyle = {
        fontWeight: 'bold',
        color: '#333',
        fontFamily: "Cambria",
        fontSize: "large"
    };

    return (
        <div style={formContainerStyle} className="form-container">
            <h1 className="text-center">Log in here!!!</h1>
            {serverErrors && <Alert color="danger">{serverErrors}</Alert>}
            <Form onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <Label for="email" style={customLabelStyle}>Enter Email</Label>
                    <Input
                        type="email"
                        value={formik.values.email}
                        name="email"
                        id="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={formik.touched.email && formik.errors.email ? 'is-invalid' : ''}
                    />
                    {formik.touched.email && formik.errors.email && <div className="text-danger">{formik.errors.email}</div>}
                </FormGroup>

                <FormGroup>
                    <Label for="password" style={customLabelStyle}>Enter Password</Label>
                    <Input
                        type="password"
                        value={formik.values.password}
                        name="password"
                        id="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={formik.touched.password && formik.errors.password ? 'is-invalid' : ''}
                    />
                    {formik.touched.password && formik.errors.password && <div className="text-danger">{formik.errors.password}</div>}
                </FormGroup>

                <Button type="submit" className="btn-success-custom" outline>Login</Button>
            </Form>

            <p className="mt-3 text-center">
                <Link to="/register">Create an account?</Link>
            </p>
        </div>
    );
}
