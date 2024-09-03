
// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { fetchPatients } from "../Action/PatientAction";
// import PatientForm from "./PatientForm";
// import { ListGroup, ListGroupItem, Button } from 'reactstrap';
// //import showcat from "../../Assests/showcat.jpg"

// export default function PatientManager() {
//     const dispatch = useDispatch();
//     const patients = useSelector((state) => state.patient.data);

//     useEffect(() => {
//         dispatch(fetchPatients());
//     }, [dispatch]);

//     const patientList = Array.isArray(patients) ? patients : [];

//     // const backgroundStyle = {
//     //     backgroundImage: `url(${showcat})`, // Use the imported image
//     //     backgroundSize: 'cover',
//     //     backgroundPosition: 'center',
//     //     height: '75vh',
//     //     display: 'flex',
//     //     justifyContent: 'center',
//     //     alignItems: 'center'
//     // };
    

//     return (
//         <div className="patient-manager-container">
//             <div className="patient-list">
//                 <h1>Listing Patients - {patientList.length}</h1>
//                 <ListGroup>
//                     {patientList.map((patient) => (
//                         <ListGroupItem key={patient._id} className="d-flex justify-content-between align-items-center">
//                             {patient.pName} - {patient.docName}
//                             <Button color="primary" tag={Link} to={`/edit-patient/${patient._id}`}>
//                                 Edit
//                             </Button>
//                         </ListGroupItem>
//                     ))}
//                 </ListGroup>
//             </div>
//             <div className="patient-form">
//                 <PatientForm />
//             </div>
//         </div>
       
//     );
// }
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPatients } from "../Action/PatientAction";
import PatientForm from "./PatientForm";
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button } from 'reactstrap';

export default function PatientManager() {
    const dispatch = useDispatch();
    const patients = useSelector((state) => state.patient.data);

    useEffect(() => {
        dispatch(fetchPatients());
    }, [dispatch]);

    const patientList = Array.isArray(patients) ? patients : [];

    return (
        <div className="patient-manager-container">
            <div className="patient-list">
                <h1 style={{fontFamily:"Cambria",fontSize:"Bolder",fontWeight:"Bolder"}}>Listing Patients - {patientList.length}</h1>
                <ListGroup>
                    {patientList.map((patient) => (
                        <ListGroupItem key={patient._id}>
                            <ListGroupItemHeading  style={{fontFamily:"Cambria",fontSize:"Bolder",fontWeight:"Bolder"}}> Patient Name :{patient.pName}</ListGroupItemHeading>
                            <ListGroupItemText>
                                Doctor: {patient.docName}
                            </ListGroupItemText>
                            <Button color="success" outline  style={{width:"100px" ,color :"pink"}} tag={Link} to={`/edit-patient/${patient._id}`}>
                                Edit
                            </Button>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </div>
            <div className="patient-form">
                <PatientForm />
            </div>
        </div>
    );
}
