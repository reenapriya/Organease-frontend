

import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../App.css'

export default function Request() {
  const [centreProfile, setCentreProfile] = useState(null);
  const [patients, setPatients] = useState([]);
  const [hospital, setHospital] = useState(null);
  const [organ, setOrgan] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState("");
  const { dispatch, request } = useAuth();
  const { id, oid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const organResponse = await axios.get(`/organShowOne/category/${oid}/organ/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setOrgan(organResponse.data);

        if (organResponse.data && organResponse.data.cid) {
          const centreResponse = await axios.get(`/showOne/${organResponse.data.cid}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          });
          setCentreProfile(centreResponse.data);
        }

        const patientResponse = await axios.get("/patientShowAll", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setPatients(patientResponse.data);

        if (patientResponse.data.length > 0 && patientResponse.data[0].hid) {
          const hospitalResponse = await axios.get(`/hospitalShowOne/${patientResponse.data[0].hid}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          });
          setHospital(hospitalResponse.data);
          dispatch({ type: "HOSPITALGETONE", payload: hospitalResponse.data });
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [oid, id]);

  const handlePatientChange = (event) => {
    const selectedPatientId = event.target.value;
    const patient = patients.find((p) => p._id === selectedPatientId);
    setSelectedPatient(patient ? patient.pName : "");
  };

  const handleSubmit = async () => {
    const formData = {
      cName: centreProfile?.cName,
      cid: centreProfile?._id,
      oprice: organ.oprice,
      secretCode: organ.secretCode,
      pName: selectedPatient,
      hospital: {
        hName: hospital?.hName,
        hEmail: hospital?.hEmail,
        contact: hospital?.contact,
        place: hospital?.place,
      },
      hid: hospital?._id,
      oid:organ._id
    };

    try {
      const requestResponse = await axios.post("/requestcreate", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      dispatch({ type: "REQUEST", payload: { request: requestResponse.data } });

      navigate(`/request-hospital`);
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  return (
    <div className="request-container">
      <h1>Request !!</h1>
      {centreProfile && <h4>Centre Name: {centreProfile.cName}</h4>}
      <ul>
        {organ ? (
          <li>
            <p>Organ Secret Code: {organ.secretCode}</p>
          </li>
        ) : (
          <p>No organ available</p>
        )}
      </ul>
      <Form>
        <FormGroup>
          <Label for="patientSelect">Select a Patient</Label>
          <Input type="select" name="select" id="patientSelect" onChange={handlePatientChange}>
            <option value="">Select a patient</option>
            {patients.length > 0 ? (
              patients.map((patient) => (
                <option key={patient._id} value={patient._id}>
                  {patient.pName}
                </option>
              ))
            ) : (
              <option>No patients available</option>
            )}
          </Input>
        </FormGroup>
        <h4>Hospital Details</h4>
        {hospital ? (
          <ul>
            <li>
              <p>Hospital Name: {hospital.hName}</p>
              <p>Hospital Email Id: {hospital.hEmail}</p>
              <p>Hospital Contact No: {hospital.contact}</p>
              <p>Hospital Address: {hospital.place}</p>
            </li>
          </ul>
        ) : (
          <p>No hospital available</p>
        )}
        <Button color="primary" onClick={handleSubmit}>Confirm</Button>
      </Form>
    </div>
  );
}


