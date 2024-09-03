

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import { addPatient, updatePatient } from "../Action/PatientAction";
// import axios from "../../config/axios";
// import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
// import '../Component/custom.css'


// export default function PatientForm() {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const patients = useSelector((state) => state.patient.data);
//     const editingPatient = patients.find((patient) => patient._id === id);

//     const [formData, setFormData] = useState({
//         pName: "",
//         pAddress: "",
//         docName: "",
//     });

//     useEffect(() => {
//         if (editingPatient) {
//             setFormData({
//                 pName: editingPatient.pName,
//                 pAddress: editingPatient.pAddress,
//                 docName: editingPatient.docName,
//             });
//         }
//     }, [editingPatient]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (editingPatient) {
//             const response = await axios.put(`/patientUpdate/${id}`, formData, {
//                 headers: {
//                     Authorization: localStorage.getItem("token")
//                 }
//             });
//             dispatch(updatePatient(response.data));
//         } else {
//             const response = await axios.post(`/patientcreate`, formData, {
//                 headers: {
//                     Authorization: localStorage.getItem("token")
//                 }
//             });
//             dispatch(addPatient(response.data));
//         }

//         setFormData({
//             pName: "",
//             pAddress: "",
//             docName: "",
//         });
//         alert("Your patient account is created. Click patient-form link again.");
//         // navigate("/add-patient"); // Redirect to the add form page
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevFormData) => ({
//             ...prevFormData,
//             [name]: value,
//         }));
//     };

//     return (
//         <div className="form-container">
//             <h3>{editingPatient ? "Edit Patient Details" : "Fill Patient Details For Add"}</h3>
//             <Form onSubmit={handleSubmit}>
//                 <FormGroup>
//                     <Label for="pName" className="form-label">Enter Patient Name</Label>
//                     <Input
//                         type="text"
//                         name="pName"
//                         id="pName"
//                         value={formData.pName}
//                         onChange={handleChange}
//                         className="form-input"
//                     />
//                 </FormGroup>
//                 <FormGroup>
//                     <Label for="pAddress" className="form-label">Enter Patient Address</Label>
//                     <Input
//                         type="textarea"
//                         name="pAddress"
//                         id="pAddress"
//                         value={formData.pAddress}
//                         onChange={handleChange}
//                         className="form-textarea"
//                     />
//                 </FormGroup>
//                 <FormGroup>
//                     <Label for="docName" className="form-label">Enter Doctor Name</Label>
//                     <p>Who handled this patient</p>
//                     <Input
//                         type="text"
//                         name="docName"
//                         id="docName"
//                         value={formData.docName}
//                         onChange={handleChange}
//                         className="form-input"
//                     />
//                 </FormGroup>
//                 <Button type="submit" className="form-submit">
//                     {editingPatient ? "Update" : "Save"}
//                 </Button>
//             </Form>
//         </div>
//     );
// }
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addPatient, updatePatient } from "../Action/PatientAction";
import axios from "../../config/axios";
import { Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';

export default function PatientForm() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const patients = useSelector((state) => state.patient.data);
    const editingPatient = patients.find((patient) => patient._id === id);

    const [formData, setFormData] = useState({
        pName: "",
        pAddress: "",
        docName: "",
    });

    useEffect(() => {
        if (editingPatient) {
            setFormData({
                pName: editingPatient.pName,
                pAddress: editingPatient.pAddress,
                docName: editingPatient.docName,
            });
        }
    }, [editingPatient]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingPatient) {
            const response = await axios.put(`/patientUpdate/${id}`, formData, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            dispatch(updatePatient(response.data));
        } else {
            const response = await axios.post(`/patientcreate`, formData, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            dispatch(addPatient(response.data));
        }

        setFormData({
            pName: "",
            pAddress: "",
            docName: "",
        });
        alert("Your patient account is created. Click patient-form link again.");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <div className="form-container" style={{padding:"100px"}}>
            <h2  style={{fontFamily:"Cambria",fontSize:"Bolder",fontWeight:"Bolder",color:"Red"}}>{editingPatient ? "Edit Patient Details" : "Fill Patient Details "}</h2>
            <Form onSubmit={handleSubmit}>
                <Row className="row-cols-lg-auto g-3 align-items-center" >
                    <Col>
                        <FormGroup>
                            <Label for="pName" className="visually-hidden">Patient Name</Label>
                            <Input
                                type="text"
                                name="pName"
                                id="pName"
                                placeholder="Enter Patient Name"
                                value={formData.pName}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="pAddress" className="visually-hidden">Patient Address</Label>
                            <Input
                                type="textarea"
                                name="pAddress"
                                id="pAddress"
                                placeholder="Enter Patient Address"
                                value={formData.pAddress}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="docName" className="visually-hidden">Doctor Name</Label>
                            <Input
                                type="text"
                                name="docName"
                                id="docName"
                                placeholder="Enter Doctor Name"
                                value={formData.docName}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <Button type="submit" style={{width :"75px"}}>
                            {editingPatient ? "Update" : "Save"}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
