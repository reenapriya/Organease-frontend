
import { useEffect, useState } from "react";
import axios from "../config/axios";
import { useAuth } from "../context/UserContext";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Alert, Button } from 'reactstrap';
import '../App.css'; // Custom CSS file

export default function Dashboard() {
  const { user, centre, hospital } = useAuth();
  const [latestRequests, setLatestRequests] = useState([]);
  const [serverErrors, setServerErrors] = useState(null);

  useEffect(() => {
    const fetchLatestRequests = async () => {
      try {
        const response = await axios.get('/latestRequests');
        setLatestRequests(response.data.slice(0, 3)); // Only take the latest 3 requests
      } catch (error) {
        console.error("Error fetching latest requests", error);
        setServerErrors(["An error occurred while fetching the latest requests."]);
      }
    };

    fetchLatestRequests();
  }, []);

  if (!user) {
    return (
      // <div className="dashboard-background">
      //   <Container className="dashboard-container mt-4">
      //     <Row>
      //       <Col>
      //         <Alert color="warning">You are logged out. Please log in to see the dashboard.</Alert>
      //       </Col>
      //     </Row>
      //   </Container>
     // </div>
     alert (" loggout")
    )
  }

  const userData = user.data ? user.data : user;
  const userCentre = Array.isArray(centre) ? centre.find(c => c.userId === userData._id) : null;
  const userHospital = Array.isArray(hospital) ? hospital.find(h => h.userId === userData._id) : null;

  return (
    <div className="dashboard-background">
      <Container className="dashboard-container mt-4">
        <Row>
          <Col md={8}>
            <Card className="mb-4">
              <CardBody>
                <CardTitle tag="h5">Your Profile Details</CardTitle>
                {user && (
                  <div className="mb-4">
                    <CardText><strong>Name:</strong> {userData.name}</CardText>
                    <CardText><strong>Email:</strong> {userData.email}</CardText>
                    <CardText><strong>Role:</strong> {userData.role}</CardText>
                  </div>
                )}
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                {userData.role === 'Centre' ? (
                  userCentre ? (
                    <>
                      <CardTitle tag="h5">Centre Details</CardTitle>
                      <CardText><strong>Contact:</strong> {userCentre.contact}</CardText>
                      <CardText><strong>Address:</strong></CardText>
                      {userCentre.address ? (
                        <>
                          <CardText><strong>Street Name:</strong> {userCentre.address.street}</CardText>
                          <CardText><strong>City:</strong> {userCentre.address.city}</CardText>
                          <CardText><strong>State:</strong> {userCentre.address.state}</CardText>
                          <CardText><strong>Country:</strong> {userCentre.address.country}</CardText>
                          <CardText><strong>Postal Code:</strong> {userCentre.address.postalCode}</CardText>
                        </>
                      ) : (
                        <CardText>No address available</CardText>
                      )}
                      {userCentre.license && (
                        <div className="mb-3">
                          <CardText><strong>License:</strong></CardText>
                          <a href={userCentre.license} target="_blank" rel="noopener noreferrer">
                            View License
                          </a>
                        </div>
                      )}
                      <Button color="primary" className="me-2">Edit</Button>
                      <Button color="danger">Remove</Button>
                    </>
                  ) : (
                    <>
                      <CardTitle tag="h5">Create Centre Profile</CardTitle>
                      {/* CentreProfileForm component */}
                    </>
                  )
                ) : (
                  userHospital ? (
                    <>
                      <CardTitle tag="h5">Hospital Details</CardTitle>
                      <CardText><strong>Contact:</strong> {userHospital.contact}</CardText>
                      <CardText><strong>Place:</strong> {userHospital.place}</CardText>
                      <Button color="primary" className="me-2">Edit</Button>
                      <Button color="danger">Remove</Button>
                    </>
                  ) : (
                    <>
                      <CardTitle tag="h5">Create Hospital Profile</CardTitle>
                      {/* HospitalProfile component */}
                    </>
                  )
                )}
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="latest-requests">
              <CardBody>
                <CardTitle tag="h5" className="text-center mb-4">Latest 3 Requests</CardTitle>
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
                {latestRequests.length > 0 ? (
                  latestRequests.map((request) => (
                    <Card key={request._id} className="mb-3">
                      <CardBody>
                        <CardTitle tag="h6">Hospital Name: {request.hospital.hName}</CardTitle>
                        <CardText><strong>Secret Code:</strong> {request.secretCode}</CardText>
                      </CardBody>
                    </Card>
                  ))
                ) : (
                  <CardText>No recent requests</CardText>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
