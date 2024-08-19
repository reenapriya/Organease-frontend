
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

  return (
    <Container className="container-custom">
      <h2 className="mb-4">Requests from Hospital</h2>
      {serverErrors && (
        <Alert color="danger" className="alert-custom">
          <h4 className="alert-heading">Error</h4>
          <ul>
            {serverErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}

      <h3>Pending Requests</h3>
      <div className="card-container">
        {pendingRequests.length > 0 ? (
          pendingRequests.map((request) => (
            <Card key={request._id} className="card-custom">
              <CardHeader className="card-header-custom">{request.hospital.hName}</CardHeader>
              <CardBody>
                <CardTitle tag="h5">Hospital Details</CardTitle>
                <CardText><strong  className="card-label-custom">Hospital Email:</strong> {request.hospital.hEmail}</CardText>
                <CardText><strong  className="card-label-custom">Secret Code:</strong> {request.secretCode}</CardText>
                <FormGroup className="form-group-check">
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
              <CardFooter className="card-footer-custom">Pending</CardFooter>
            </Card>
          ))
        ) : (
          <p>No pending requests</p>
        )}
      </div>

      <h3>Approved Requests</h3>
      <div className="card-container">
        {approvedRequests.length > 0 ? (
          approvedRequests.map((request) => (
            <Card key={request._id} className="card-custom">
              <CardHeader className="card-header-custom">{request.hospital.hName}</CardHeader>
              <CardBody>
                <CardTitle tag="h5">Hospital Details</CardTitle>
                <CardText><strong  className="card-label-custom">Hospital Email:</strong> {request.hospital.hEmail}</CardText>
                <CardText><strong className="card-label-custom">Secret Code:</strong> {request.secretCode}</CardText>
                <FormGroup className="form-group-check">
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
              <CardFooter className="card-footer-custom">Approved</CardFooter>
            </Card>
          ))
        ) : (
          <p>No approved requests</p>
        )}
      </div>
    </Container>
  );
}
