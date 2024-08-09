
import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "../config/axios";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

import '../App.css'; // Import custom CSS

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

  return (
       <div className="register-background">
      <div className="register-form-container">
        <h1 className="text-center mb-4">Create your account!!!</h1>
        {serverErrors && <Alert color="danger">{serverErrors}</Alert>}
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label htmlFor="name" className="form-check-inline">Enter the Name of the Centre/Hospital</Label>
            <Input
              type="text"
              value={formik.values.name}
              name="name"
              id="name"
              onChange={formik.handleChange}
              className="form-control"
            />
            {formik.errors.name && <div className="text-danger">{formik.errors.name}</div>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email" className="form-check-inline">Enter Email</Label>
            <Input
              type="email"
              value={formik.values.email}
              name="email"
              id="email"
              onChange={formik.handleChange}
              className="form-control"
            />
            {formik.errors.email && <div className="text-danger">{formik.errors.email}</div>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password" className="form-check-inline">Enter Password</Label>
            <Input
              type="password"
              value={formik.values.password}
              name="password"
              id="password"
              onChange={formik.handleChange}
              className="form-control"
            />
            {formik.errors.password && <div className="text-danger">{formik.errors.password}</div>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword" className="form-check-inline">Confirm Password</Label>
            <Input
              type="password"
              value={formik.values.confirmPassword}
              name="confirmPassword"
              id="confirmPassword"
              onChange={formik.handleChange}
              className="form-control"
            />
            {formik.errors.confirmPassword && <div className="text-danger">{formik.errors.confirmPassword}</div>}
          </FormGroup>

          <FormGroup>
            <Label className="form-check-inline">Select a One belong to You</Label><br />
            <div className="form-check form-check-inline">
              <Input
                type="radio"
                value="Centre"
                onChange={formik.handleChange}
                checked={formik.values.role === 'Centre'}
                id="Centre"
                name="role"
                className="form-check-input"
              />
              <Label htmlFor="Centre" className="form-check-label">Centre</Label>
            </div>
            <div className="form-check form-check-inline">
              <Input
                type="radio"
                value="Hospital"
                onChange={formik.handleChange}
                checked={formik.values.role === 'Hospital'}
                id="Hospital"
                name="role"
                className="form-check-input"
              />
              <Label htmlFor="Hospital" className="form-check-label">Hospital</Label>
            </div>
            {formik.errors.role && <div className="text-danger">{formik.errors.role}</div>}
          </FormGroup>

          <Button type="submit" color="dark"  size="sm" width="7px">Sign Up</Button>
        </Form>
      </div>
      </div>
    
  );
}
