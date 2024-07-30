
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/UserContext";

export default function RequestHospitalSide() {
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/hospitalMyshow`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log("Hospital Data:", response.data);
        const hid = response.data._id;
        console.log("Hospital ID:", hid);

        const requestResponse = await axios.get(`/hospitalrequestShow/${hid}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log("Request Data:", requestResponse.data);

        const approved = requestResponse.data.filter(request => request.isApproved);
        const pending = requestResponse.data.filter(request => !request.isApproved);

        setApprovedRequests(approved);
        setPendingRequests(pending);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    })();
  }, []);

  const handleBack = () => {
    navigate("/show-centre");
  };

  return (
    <div>
      <h3>Pending Requests</h3>
      {pendingRequests.length > 0 ? (
        pendingRequests.map((request, index) => (
          <div key={index}>
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
          <div key={index}>
            <h4>Request Sent from {request.hospital?.hName || "N/A"}</h4>
            <p>Centre Name: {request.cName}</p>
            <p>Is Approved: Yes</p>
            <p>Patient Name: {request.pName}</p>
            <p>Secret Code: {request.secretCode}</p>
            
          </div>
        ))
      ) : (
        <p>No approved requests</p>
      )}

      <button onClick={handleBack}>Back</button>
    </div>
  );
}
