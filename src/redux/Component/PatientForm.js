

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addPatient, updatePatient } from "../Action/PatientAction";
import axios from "../../config/axios";
import { useParams, useNavigate } from "react-router-dom";

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
      alert (" your patient account is created  i want to know click patient-form link again")
       // navigate("/add-patient"); // Redirect to the add form page
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <div>
            <h3>{editingPatient ? "Edit Patient Details" : "Fill Patient Details for Added "}</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="pName">Enter Patient Name</label>
                <input
                    type="text"
                    onChange={handleChange}
                    name="pName"
                    id="pName"
                    value={formData.pName}
                />
                <br />
                <br />
                <label htmlFor="pAddress">Enter Patient Address</label>
                <textarea
                    onChange={handleChange}
                    name="pAddress"
                    id="pAddress"
                    value={formData.pAddress}
                />
                <br />
                <br />
                <label htmlFor="docName">Enter Doctor Name</label>
                <p>who handled this patient</p>
                <input
                    type="text"
                    onChange={handleChange}
                    name="docName"
                    id="docName"
                    value={formData.docName}
                />
                <br />
                <br />
                <input type="submit" value={editingPatient ? "Update" : "Save"} />
            </form>
        </div>
    );
}

