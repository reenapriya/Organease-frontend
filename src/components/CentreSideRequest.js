

import { useEffect, useState } from "react";
import axios from "../config/axios";
import { useAuth } from "../context/UserContext";
import { useParams } from "react-router-dom";
import { Container, Card, CardBody, CardTitle, CardText, CardHeader, CardFooter, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import '../App.css'; // Import custom CSS

export default function CentreSideRequest() {
  const { dispatch, centre, request } = useAuth();
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [serverErrors, setServerErrors] = useState(null);

  const { id } = useParams(); // Assuming you have an ID in the URL params

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/centreMyshow`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        const cid = response.data._id;

        const requestcentreResponse = await axios.get(`/centrerequestShow/${cid}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        const approved = requestcentreResponse.data.filter(request => request.isApproved);
        const pending = requestcentreResponse.data.filter(request => !request.isApproved);

        setApprovedRequests(approved);
        setPendingRequests(pending);
      } catch (error) {
        console.error("Error fetching request centre data", error);
        setServerErrors(["An error occurred while fetching data."]);
      }
    })();
  }, [id]);

  const handleCheckboxChange = async (requestId, newStatus) => {
    try {
      await axios.put(`/centrerequestUpdate/${requestId}`, {
        isApproved: newStatus,
      }, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      alert("Approval status updated and email sent!");

      setApprovedRequests((prev) =>
        prev.map((request) =>
          request._id === requestId ? { ...request, isApproved: newStatus } : request
        )
      );
      setPendingRequests((prev) =>
        prev.map((request) =>
          request._id === requestId ? { ...request, isApproved: newStatus } : request
        )
      );
    } catch (error) {
      console.error("Error updating approval status", error);
      setServerErrors(["An error occurred while updating status."]);
    }
  };

  const formContainerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '500px',
    width: '100%'
  };

  return (
    <Container className="mt-5" style={formContainerStyle}>
      <h4 className="text-center mb-4">Requests from Hospital</h4>
      {serverErrors && (
        <Alert color="danger">
          <h4 className="alert-heading">Error</h4>
          <ul>
            {serverErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}

      <h5>Pending Requests</h5>
      {pendingRequests.length > 0 ? (
        pendingRequests.map((request) => (
          <Card key={request._id} className="my-2" style={{ width: '18rem' }}>
            <CardHeader>{request.hospital.hName}</CardHeader>
            <CardBody>
              <CardTitle tag="h5">Hospital Details</CardTitle>
              <CardText><strong>Hospital Email:</strong> {request.hospital.hEmail}</CardText>
              <CardText><strong>Secret Code:</strong> {request.secretCode}</CardText>
              <FormGroup check>
                <Label check>
                  <Input 
                    type="checkbox" 
                    checked={request.isApproved} 
                    onChange={(e) => handleCheckboxChange(request._id, e.target.checked)} 
                  />
                  {' '}
                  Is Approved
                </Label>
              </FormGroup>
            </CardBody>
            <CardFooter>Pending</CardFooter>
          </Card>
        ))
      ) : (
        <p>No pending requests</p>
      )}

      <h5>Approved Requests</h5>
      {approvedRequests.length > 0 ? (
        approvedRequests.map((request) => (
          <Card key={request._id} className="my-2" style={{ width: '18rem' }}>
            <CardHeader>{request.hospital.hName}</CardHeader>
            <CardBody>
              <CardTitle tag="h5">Hospital Details</CardTitle>
              <CardText><strong>Hospital Email:</strong> {request.hospital.hEmail}</CardText>
              <CardText><strong>Secret Code:</strong> {request.secretCode}</CardText>
              <FormGroup check>
                <Label check>
                  <Input 
                    type="checkbox" 
                    checked={request.isApproved} 
                    onChange={(e) => handleCheckboxChange(request._id, e.target.checked)} 
                  />
                  {' '}
                  Is Approved
                </Label>
              </FormGroup>
            </CardBody>
            <CardFooter>Approved</CardFooter>
          </Card>
        ))
      ) : (
        <p>No approved requests</p>
      )}
    </Container>
  );
}
