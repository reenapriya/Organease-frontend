

// import { useAuth } from "../context/UserContext";
// import CentreProfileForm from "./CentreProfileForm";
// import HospitalProfile from "./HospitalProfile";
// import { useNavigate } from "react-router-dom";
// import axios from "../config/axios";
// import { Container, Row, Col, Button } from 'reactstrap';
// import '../App.css'; // Custom CSS file

// export default function Dashboard() {
//     const { user, centre, dispatch, hospital } = useAuth();
//     const navigate = useNavigate();

//     if (!user) {
//         return <div className="container"><div className="alert alert-info">Loading...</div></div>;
//     }

//     const userData = user.data ? user.data : user;
//     const userCentre = Array.isArray(centre) ? centre.find(c => c.userId === userData._id) : null;
//     const userHospital = Array.isArray(hospital) ? hospital.find(h => h.userId === userData._id) : null;

//     const handleEdit = (id) => {
//         navigate(`/centreprofileedit/${id}`);
//     };

//     const handleRemove = async (id) => {
//         try {
//             await axios.delete(`/delete/${userData._id}`, {
//                 headers: {
//                     Authorization: localStorage.getItem("token"),
//                 },
//             });
//             dispatch({ type: "LOGOUT" });
//             navigate('/login');
//         } catch (error) {
//             console.error("Error deleting user:", error);
//         }
//     };

//     const handleHosEdit = (id) => {
//         navigate(`/hospitalprofileedit/${id}`);
//     };

//     const handleHosRemove = async (id) => {
//         try {
//             await axios.delete(`/hospitalDelete/${userData._id}`, {
//                 headers: {
//                     Authorization: localStorage.getItem("token"),
//                 },
//             });
//             dispatch({ type: "LOGOUT" });
//             navigate('/login');
//         } catch (error) {
//             console.error("Error deleting user:", error);
//         }
//     };

//     const handleClick = () => {
//         navigate("/");
//     };

//     return (
//         <div className="dashboard-background">
//             <Container className="dashboard-container mt-4">
//                 <Row>
//                     <Col md={6} className="account-info">
//                         <h2 className="mb-4">Your Profile Details:</h2>
//                         {user && (
//                             <div className="mb-4">
//                                 <p><strong>Name:</strong> {userData.name}</p>
//                                 <p><strong>Email:</strong> {userData.email}</p>
//                                 <p><strong>Role:</strong> {userData.role}</p>
//                             </div>
//                         )}
//                     </Col>
//                     <Col md={6} className="profile-info">
//                         {userData.role === 'Centre' ? (
//                             userCentre ? (
//                                 <div className="mb-4">
//                                     <h3 className="mb-3">Centre Details</h3>
//                                     <p><strong>Contact:</strong> {userCentre.contact}</p>
//                                     <p><strong>Address:</strong></p>
//                                     {userCentre.address ? (
//                                         <div className="mb-3">
//                                             <p><strong>Door No:</strong> {userCentre.address.doorNo}</p>
//                                             <p><strong>Street Name:</strong> {userCentre.address.street}</p>
//                                             <p><strong>City:</strong> {userCentre.address.city}</p>
//                                             <p><strong>State:</strong> {userCentre.address.state}</p>
//                                             <p><strong>Country:</strong> {userCentre.address.country}</p>
//                                             <p><strong>Postal Code:</strong> {userCentre.address.postalCode}</p>
//                                         </div>
//                                     ) : (
//                                         <p>No address available</p>
//                                     )}
//                                     {userCentre.license && (
//                                         <div className="mb-3">
//                                             <p><strong>License:</strong></p>
//                                             <a href={userCentre.license} target="_blank" rel="noopener noreferrer">
//                                                 View License
//                                             </a>
//                                         </div>
//                                     )}
//                                     <Button color="primary" className="me-2" onClick={() => handleEdit(userCentre._id)}>Edit</Button>
//                                     <Button color="danger" onClick={() => handleRemove(userCentre._id)}>Remove</Button>
//                                 </div>
//                             ) : (
//                                 <div className="mb-4">
//                                     <h3 className="mb-3">Create Centre Profile</h3>
//                                     <CentreProfileForm />
//                                 </div>
//                             )
//                         ) : (
//                             userHospital ? (
//                                 <div className="mb-4">
//                                     <h3 className="mb-3">Hospital Details</h3>
//                                     {/* <p><strong>Name:</strong> {userHospital.hName}</p>
//                                     <p><strong>Email:</strong> {userHospital.hEmail}</p> */}
//                                     <p><strong>Contact:</strong> {userHospital.contact}</p>
//                                     <p><strong>Place:</strong> {userHospital.place}</p>
//                                     <Button color="primary" className="me-2" onClick={() => handleHosEdit(userHospital._id)}>Edit</Button>
//                                     <Button color="danger" onClick={() => handleHosRemove(userHospital._id)}>Remove</Button>
//                                 </div>
//                             ) : (
//                                 <div className="mb-4">
//                                     <h3 className="mb-3">Create Hospital Profile</h3>
//                                     <HospitalProfile />
//                                 </div>
//                             )
//                         )}
//                     </Col>
//                 </Row>
//                 <Button onClick={handleClick} color="secondary" className="back-button">Back</Button>
//             </Container>
//         </div>
//     );
// }

import { useEffect, useState } from "react";
import axios from "../config/axios";
import { useAuth } from "../context/UserContext";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button, Alert } from 'reactstrap';
import '../App.css'; // Custom CSS file

export default function Dashboard() {
  const { user, centre, dispatch, hospital } = useAuth();
  const [latestRequests, setLatestRequests] = useState([]);
  const [serverErrors, setServerErrors] = useState(null);

  useEffect(() => {
    const fetchLatestRequests = async () => {
      try {
        const response = await axios.get('/latestRequests', {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setLatestRequests(response.data);
      } catch (error) {
        console.error("Error fetching latest requests", error);
        setServerErrors(["An error occurred while fetching latest requests."]);
      }
    };

    fetchLatestRequests();
  }, []);

  const userData = user.data ? user.data : user;
  const userCentre = Array.isArray(centre) ? centre.find(c => c.userId === userData._id) : null;
  const userHospital = Array.isArray(hospital) ? hospital.find(h => h.userId === userData._id) : null;

  const handleClick = (requestId) => {
    // Navigate to the request details or handle click as needed
    console.log("Request clicked:", requestId);
  };

  return (
    <div className="dashboard-background">
      <Container className="dashboard-container mt-4">
        <Row>
          <Col md={6} className="account-info">
            <h2 className="mb-4">Your Profile Details:</h2>
            {user && (
              <div className="mb-4">
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Role:</strong> {userData.role}</p>
              </div>
            )}
          </Col>
          <Col md={6} className="profile-info">
            {userData.role === 'Centre' ? (
              userCentre ? (
                <div className="mb-4">
                  <h3 className="mb-3">Centre Details</h3>
                  <p><strong>Contact:</strong> {userCentre.contact}</p>
                  <p><strong>Address:</strong></p>
                  {userCentre.address ? (
                    <div className="mb-3">
                      <p><strong>Door No:</strong> {userCentre.address.doorNo}</p>
                      <p><strong>Street Name:</strong> {userCentre.address.street}</p>
                      <p><strong>City:</strong> {userCentre.address.city}</p>
                      <p><strong>State:</strong> {userCentre.address.state}</p>
                      <p><strong>Country:</strong> {userCentre.address.country}</p>
                      <p><strong>Postal Code:</strong> {userCentre.address.postalCode}</p>
                    </div>
                  ) : (
                    <p>No address available</p>
                  )}
                  {userCentre.license && (
                    <div className="mb-3">
                      <p><strong>License:</strong></p>
                      <a href={userCentre.license} target="_blank" rel="noopener noreferrer">
                        View License
                      </a>
                    </div>
                  )}
                  <Button color="primary" className="me-2">Edit</Button>
                  <Button color="danger">Remove</Button>
                </div>
              ) : (
                <div className="mb-4">
                  <h3 className="mb-3">Create Centre Profile</h3>
                  {/* CentreProfileForm component */}
                </div>
              )
            ) : (
              userHospital ? (
                <div className="mb-4">
                  <h3 className="mb-3">Hospital Details</h3>
                  {/* <p><strong>Name:</strong> {userHospital.hName}</p>
                  <p><strong>Email:</strong> {userHospital.hEmail}</p> */}
                  <p><strong>Contact:</strong> {userHospital.contact}</p>
                  <p><strong>Place:</strong> {userHospital.place}</p>
                  <Button color="primary" className="me-2">Edit</Button>
                  <Button color="danger">Remove</Button>
                </div>
              ) : (
                <div className="mb-4">
                  <h3 className="mb-3">Create Hospital Profile</h3>
                  {/* HospitalProfile component */}
                </div>
              )
            )}
          </Col>
        </Row>
        <Row>
          <Col md={12} className="latest-requests">
            <h4 className="text-center mb-4">Latest 3 Requests</h4>
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
                <Card key={request._id} className="mb-3" onClick={() => handleClick(request._id)}>
                  <CardBody>
                    <CardTitle tag="h5">Hospital Name: {request.hospital.hName}</CardTitle>
                    <CardText><strong>Secret Code:</strong> {request.secretCode}</CardText>
                  </CardBody>
                </Card>
              ))
            ) : (
              <p>No recent requests</p>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
