
import { useSelector,useDispatch } from "react-redux";
import { Link  } from "react-router-dom";
import {useEffect} from "react"
import PatientForm from "./PatientForm";

import { fetchPatients } from "../Action/PatientAction";


export default function PatientManager() {
    const dispatch = useDispatch();
    const patients = useSelector((state) => state.patient.data);

    useEffect(() => {
        dispatch(fetchPatients());
    }, [dispatch]);

    const patientList = Array.isArray(patients) ? patients : [];
    return (
        <div>
            <h1>Listing Patients - {patients.length}</h1>
            <ul>
                {patients.map((patient) => (
                    <li key={patient._id}>
                        {patient.pName} - {patient.docName}
                        <Link to={`/edit-patient/${patient._id}`}>Edit</Link>
                        
                    </li>
                ))}
            </ul>
            <PatientForm />
           
        </div>
    );
}
