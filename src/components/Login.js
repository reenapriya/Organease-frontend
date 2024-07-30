// import { Link } from "react-router-dom";
// import React, { useState } from "react";
// import { useFormik } from "formik";
// import axios from "../config/axios";
// import * as yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/UserContext";

// const loginValidationSchema = yup.object({
//     email: yup.string().required("Email is required").email("Invalid email address"),
//     password: yup.string().required("Password is required").min(3, "Password is too short").max(30, "Password is too long")
// });

// export default function Login() {
//     const { dispatch } = useAuth();
//     const navigate = useNavigate();
//     const [serverErrors, setServerErrors] = useState("");

//     const formik = useFormik({
//         initialValues: {
//             email: "",
//             password: ""
//         },
//         validationSchema: loginValidationSchema,
//         onSubmit: async (values) => {
//             try {
//                 const response = await axios.post("/login", values);
//                 localStorage.setItem("token", response.data.token);

//                 const userResponse = await axios.get("/account", {
//                     headers: {
//                         Authorization: localStorage.getItem("token")
//                     }
//                 });

//                 // Dispatch user data
//                 dispatch({ type: "LOGIN", payload: { data: userResponse.data } });

//                 // Check user role and fetch relevant profile data if necessary
//                 if (userResponse.data.role === 'Centre') {
//                     const centreResponse = await axios.get("/showAll", {
//                         headers: {
//                             Authorization: localStorage.getItem("token")
//                         }
//                     });

//                     // Dispatch center data
//                     dispatch({ type: "CENTREPROFILE", payload: { centre: centreResponse.data } });
//                     navigate("/dashboard");
//                 } else if (userResponse.data.role === 'Hospital') {
//                     const hospitalResponse = await axios.get("/hospitalShow", {
//                         headers: {
//                             Authorization: localStorage.getItem("token")
//                         }
//                     });

//                     // Dispatch hospital data
//                     dispatch({ type: "HOSPITALPROFILE", payload: { hospital: hospitalResponse.data } });
//                     navigate("/dashboard");
//                 } else {
//                     setServerErrors("You don't have permission to access.");
//                 }
//             } catch (e) {
//                 setServerErrors(e.response?.data?.errors || "Login failed. Please try again.");
//             }
//         }
//     });

//     return (
//         <div>
//             <h1>Log in here!!!</h1>
//             {serverErrors && <b>{serverErrors}</b>}
//             <form onSubmit={formik.handleSubmit}>
//                 <label htmlFor="email">Enter Email</label>
//                 <input
//                     type="email"
//                     value={formik.values.email}
//                     name="email"
//                     id="email"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                 />
//                 <br />
//                 {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
//                 <br />

//                 <label htmlFor="password">Enter Password</label>
//                 <input
//                     type="password"
//                     value={formik.values.password}
//                     name="password"
//                     id="password"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                 />
//                 <br />
//                 {formik.touched.password && formik.errors.password && <div>{formik.errors.password}</div>}
//                 <br />

//                 <input type="submit" value="Login" />
//             </form>

//             <p>
//             <Link to="/forgot-password">Forgot Password?</Link>
//         </p>
//         </div>
//     );
// }
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "../config/axios";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import login from '../Assests/login.png'; // Import the background image

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

    // Background image style
    const backgroundStyle = {
        backgroundImage: `url(${login})`, // Use the imported image
        backgroundSize: 'cover-all',
        backgroundPosition: 'center',
        height: '100vh',
        weight:'500vh',
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
                <h1 className="text-center">Log in here!!!</h1>
                {serverErrors && <div className="alert alert-danger">{serverErrors}</div>}
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Enter Email</label>
                        <input
                            type="email"
                            value={formik.values.email}
                            name="email"
                            id="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-control"
                        />
                        {formik.touched.email && formik.errors.email && <div className="text-danger">{formik.errors.email}</div>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Enter Password</label>
                        <input
                            type="password"
                            value={formik.values.password}
                            name="password"
                            id="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-control"
                        />
                        {formik.touched.password && formik.errors.password && <div className="text-danger">{formik.errors.password}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>
                </form>

                <p className="mt-3">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </p>
            </div>
        </div>
    );
}

