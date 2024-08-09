
import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { Button } from 'reactstrap';
import { useAuth } from "../context/UserContext";
import '../App.css'

export default function RequestHospitalSide() {
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/hospitalMyshow`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        const hid = response.data._id;

        const requestResponse = await axios.get(`/hospitalrequestShow/${hid}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        const approved = requestResponse.data.filter(request => request.isApproved);
        const pending = requestResponse.data.filter(request => !request.isApproved);

        setApprovedRequests(approved);
        setPendingRequests(pending);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    })();
  }, []);

  const handlePayment = (id) => {
    navigate(`/payment/${id}`);
  };

  const handleBack = () => {
    navigate("/show-centre");
  };

  return (
    <div className="request-container">
      <h3>Pending Requests</h3>
      {pendingRequests.length > 0 ? (
        pendingRequests.map((request, index) => (
          <div key={index} className="request-item">
            <h4>Request Sent from {request.hospital?.hName || "N/A"}</h4>
            <p>Centre Name: {request.cName}</p>
            <p>Is Approved: No</p>
            <p>Patient Name: {request.pName}</p>
          </div>
        ))
      ) : (
        <p>No pending requests</p>
      )}

      <h3>Approved Requests</h3>
      {approvedRequests.length > 0 ? (
        approvedRequests.map((request, index) => (
          <div key={index} className="request-item">
            <h4>Request Sent from {request.hospital?.hName || "N/A"}</h4>
            <p>Centre Name: {request.cName}</p>
            <p>Is Approved: Yes</p>
            <p>Patient Name: {request.pName}</p>
            <p>Secret Code: {request.secretCode}</p>
            <Button color="primary" onClick={() => handlePayment(request._id)}>Payment Process</Button>
          </div>
        ))
      ) : (
        <p>No approved requests</p>
      )}
      <Button className="back-button" onClick={handleBack}>Back</Button>
    </div>
  );
}
