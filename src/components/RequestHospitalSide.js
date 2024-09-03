
// // // import React, { useEffect, useState } from "react";
// // // import axios from "../config/axios";
// // // import { useNavigate } from "react-router-dom";
// // // import { Button } from 'reactstrap';
// // // import { useAuth } from "../context/UserContext";
// // // import '../App.css'

// // // export default function RequestHospitalSide() {
// // //   const [approvedRequests, setApprovedRequests] = useState([]);
// // //   const [pendingRequests, setPendingRequests] = useState([]);
// // //   const navigate = useNavigate();
// // //   const { dispatch } = useAuth();

// // //   useEffect(() => {
// // //     (async () => {
// // //       try {
// // //         const response = await axios.get(`/hospitalMyshow`, {
// // //           headers: {
// // //             Authorization: localStorage.getItem("token"),
// // //           },
// // //         });
// // //         const hid = response.data._id;

// // //         const requestResponse = await axios.get(`/hospitalrequestShow/${hid}`, {
// // //           headers: {
// // //             Authorization: localStorage.getItem("token"),
// // //           },
// // //         });

// // //         const approved = requestResponse.data.filter(request => request.isApproved);
// // //         const pending = requestResponse.data.filter(request => !request.isApproved);

// // //         setApprovedRequests(approved);
// // //         setPendingRequests(pending);
// // //       } catch (error) {
// // //         console.error("Error fetching data", error);
// // //       }
// // //     })();
// // //   }, []);

// // //   const handlePayment = (id) => {
// // //     navigate(`/payment/${id}`);
// // //   };

// // //   const handleBack = () => {
// // //     navigate("/show-centre");
// // //   };

// // //   return (
// // //     <div className="request-container">
// // //       <h3>Pending Requests</h3>
// // //       {pendingRequests.length > 0 ? (
// // //         pendingRequests.map((request, index) => (
// // //           <div key={index} className="request-item">
// // //             <h4>Request Sent from {request.hospital?.hName || "N/A"}</h4>
// // //             <p>Centre Name: {request.cName}</p>
// // //             <p>Is Approved: No</p>
// // //             <p>Patient Name: {request.pName}</p>
// // //           </div>
// // //         ))
// // //       ) : (
// // //         <p>No pending requests</p>
// // //       )}

// // //       <h3>Approved Requests</h3>
// // //       {approvedRequests.length > 0 ? (
// // //         approvedRequests.map((request, index) => (
// // //           <div key={index} className="request-item">
// // //             <h4>Request Sent from {request.hospital?.hName || "N/A"}</h4>
// // //             <p>Centre Name: {request.cName}</p>
// // //             <p>Is Approved: Yes</p>
// // //             <p>Patient Name: {request.pName}</p>
// // //             <p>Secret Code: {request.secretCode}</p>
// // //             <Button color="primary" onClick={() => handlePayment(request._id)}>Payment Process</Button>
// // //           </div>
// // //         ))
// // //       ) : (
// // //         <p>No approved requests</p>
// // //       )}
// // //       <Button className="back-button" onClick={handleBack}>Back</Button>
// // //     </div>
// // //   );
// // // }
// // import React, { useEffect, useState } from "react";
// // import axios from "../config/axios";
// // import { useNavigate } from "react-router-dom";
// // import { Container, Card, CardBody, CardTitle, CardText, CardHeader, CardFooter, Button } from 'reactstrap';
// // import { useAuth } from "../context/UserContext";
// // import '../App.css';

// // export default function RequestHospitalSide() {
// //   const [approvedRequests, setApprovedRequests] = useState([]);
// //   const [pendingRequests, setPendingRequests] = useState([]);
// //   const navigate = useNavigate();
// //   const { dispatch } = useAuth();

// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         const response = await axios.get(`/hospitalMyshow`, {
// //           headers: {
// //             Authorization: localStorage.getItem("token"),
// //           },
// //         });
// //         const hid = response.data._id;

// //         const requestResponse = await axios.get(`/hospitalrequestShow/${hid}`, {
// //           headers: {
// //             Authorization: localStorage.getItem("token"),
// //           },
// //         });

// //         const approved = requestResponse.data.filter(request => request.isApproved);
// //         const pending = requestResponse.data.filter(request => !request.isApproved);

// //         setApprovedRequests(approved);
// //         setPendingRequests(pending);
// //       } catch (error) {
// //         console.error("Error fetching data", error);
// //       }
// //     })();
// //   }, []);

// //   const handlePayment = (id) => {
// //     navigate(`/payment/${id}`);
// //   };

// //   const handleBack = () => {
// //     navigate("/show-centre");
// //   };

// //   const formContainerStyle = {
// //     backgroundColor: 'rgba(255, 255, 255, 0.8)',
// //     padding: '20px',
// //     borderRadius: '10px',
// //     maxWidth: '800px',
// //     width: '100%',
// //     margin: 'auto'
// //   };

// //   return (
// //     <Container className="mt-5" style={formContainerStyle}>
// //       <h4 className="text-center mb-4">Requests to Centre</h4>

// //       <h5>Pending Requests</h5>
// //       {pendingRequests.length > 0 ? (
// //         pendingRequests.map((request, index) => (
// //           <Card key={index} className="my-2" style={{ width: '18rem' }}>
// //             <CardHeader>Request Sent from {request.hospital?.hName || "N/A"}</CardHeader>
// //             <CardBody>
// //               <CardTitle tag="h5">Request Details</CardTitle>
// //               <CardText><strong>Centre Name:</strong> {request.cName}</CardText>
// //               <CardText><strong>Patient Name:</strong> {request.pName}</CardText>
// //               <CardFooter>Is Approved: No</CardFooter>
// //             </CardBody>
// //           </Card>
// //         ))
// //       ) : (
// //         <p>No pending requests</p>
// //       )}

// //       <h5>Approved Requests</h5>
// //       {approvedRequests.length > 0 ? (
// //         approvedRequests.map((request, index) => (
// //           <Card key={index} className="my-2" style={{ width: '18rem' }}>
// //             <CardHeader>Request Sent from {request.hospital?.hName || "N/A"}</CardHeader>
// //             <CardBody>
// //               <CardTitle tag="h5">Request Details</CardTitle>
// //               <CardText><strong>Centre Name:</strong> {request.cName}</CardText>
// //               <CardText><strong>Patient Name:</strong> {request.pName}</CardText>
// //               <CardText><strong>Secret Code:</strong> {request.secretCode}</CardText>
// //               <Button color="primary" onClick={() => handlePayment(request._id)}>Payment Process</Button>
// //             </CardBody>
// //             <CardFooter>Is Approved: Yes</CardFooter>
// //           </Card>
// //         ))
// //       ) : (
// //         <p>No approved requests</p>
// //       )}

// //       <Button color="secondary" onClick={handleBack}>Back</Button>
// //     </Container>
// //   );
// // }

// import React, { useEffect, useState } from "react";
// import axios from "../config/axios";
// import { useNavigate } from "react-router-dom";
// import { Container, Card, CardBody, CardTitle, CardText, CardHeader, CardFooter, Button } from 'reactstrap';
// import { useAuth } from "../context/UserContext";
// import '../App.css';

// export default function RequestHospitalSide() {
//   const [approvedRequests, setApprovedRequests] = useState([]);
//   const [pendingRequests, setPendingRequests] = useState([]);
//   const navigate = useNavigate();
//   const { dispatch } = useAuth();

//   useEffect(() => {
//     (async () => {
//       try {
//         const response = await axios.get(`/hospitalMyshow`, {
//           headers: {
//             Authorization: localStorage.getItem("token"),
//           },
//         });
//         const hid = response.data._id;

//         const requestResponse = await axios.get(`/hospitalrequestShow/${hid}`, {
//           headers: {
//             Authorization: localStorage.getItem("token"),
//           },
//         });

//         const approved = requestResponse.data.filter(request => request.isApproved);
//         const pending = requestResponse.data.filter(request => !request.isApproved);

//         setApprovedRequests(approved);
//         setPendingRequests(pending);
//       } catch (error) {
//         console.error("Error fetching data", error);
//       }
//     })();
//   }, []);

//   const handlePayment = (id) => {
//     navigate(`/payment/${id}`);
//   };

//   const handleBack = () => {
//     navigate("/show-centre");
//   };

//   const formContainerStyle = {
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     padding: '20px',
//     borderRadius: '10px',
//     maxWidth: '800px',
//     width: '100%',
//     margin: 'auto'
//   };

//   return (
//     <Container className="mt-5" style={formContainerStyle}>
//       <h4 className="text-center mb-4">Requests to Centre</h4>

//       <h5>Pending Requests</h5>
//       <div className="card-container">
//         {pendingRequests.length > 0 ? (
//           pendingRequests.map((request, index) => (
//             <Card key={index} className="card-custom">
//               <CardHeader className="card-header-custom">Request Sent from {request.hospital?.hName || "N/A"}</CardHeader>
//               <CardBody>
//                 <CardTitle tag="h5">Request Details</CardTitle>
//                 <CardText><strong className="card-label-custom">Centre Name:</strong> {request.cName}</CardText>
//                 <CardText><strong className="card-label-custom">Patient Name:</strong> {request.pName}</CardText>
//               </CardBody>
//               <CardFooter className="card-footer-custom">Pending</CardFooter>
//             </Card>
//           ))
//         ) : (
//           <p>No pending requests</p>
//         )}
//       </div>

//       <h5>Approved Requests</h5>
//       <div className="card-container">
//         {approvedRequests.length > 0 ? (
//           approvedRequests.map((request, index) => (
//             <Card key={index} className="card-custom">
//               <CardHeader className="card-header-custom">Request Sent from {request.hospital?.hName || "N/A"}</CardHeader>
//               <CardBody>
//                 <CardTitle tag="h5">Request Details</CardTitle>
//                 <CardText><strong className="card-label-custom">Centre Name:</strong> {request.cName}</CardText>
//                 <CardText><strong className="card-label-custom">Patient Name:</strong> {request.pName}</CardText>
//                 <CardText><strong className="card-label-custom">Secret Code:</strong> {request.secretCode}</CardText>
//                 <Button color="primary" onClick={() => handlePayment(request._id)}>Payment Process</Button>
//               </CardBody>
//               <CardFooter className="card-footer-custom">Approved</CardFooter>
//             </Card>
//           ))
//         ) : (
//           <p>No approved requests</p>
//         )}
//       </div>

//       <Button color="secondary" onClick={handleBack}>Back</Button>
//     </Container>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { Container, Card, CardBody, CardTitle, CardText, CardHeader, CardFooter, Button } from 'reactstrap';
import { useAuth } from "../context/UserContext";
import '../App.css';

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

  const formContainerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '800px',
    width: '100%',
    margin: 'auto'
  };

  return (
    <Container className="mt-5" style={formContainerStyle}>
      <h4 className="text-center mb-4">Requests to Centre</h4>

      <h5>Pending Requests</h5>
      <div className="card-container">
        {pendingRequests.length > 0 ? (
          pendingRequests.map((request, index) => (
            <Card key={index} className="card-custom">
              <CardHeader className="card-header-custom">Request Sent from {request.hospital?.hName || "N/A"}</CardHeader>
              <CardBody>
                <CardTitle tag="h5">Request Details</CardTitle>
                <CardText><strong className="card-label-custom">Centre Name:</strong> {request.cName}</CardText>
                <CardText><strong className="card-label-custom">Patient Name:</strong> {request.pName}</CardText>
              </CardBody>
              <CardFooter className="card-footer-custom">Pending</CardFooter>
            </Card>
          ))
        ) : (
          <p>No pending requests</p>
        )}
      </div>

      <h5>Approved Requests</h5>
      <div className="card-container">
        {approvedRequests.length > 0 ? (
          approvedRequests.map((request, index) => (
            <Card key={index} className="card-custom">
              <CardHeader className="card-header-custom">Request Sent from {request.hospital?.hName || "N/A"}</CardHeader>
              <CardBody>
                <CardTitle tag="h5">Request Details</CardTitle>
                <CardText><strong className="card-label-custom">Centre Name:</strong> {request.cName}</CardText>
                <CardText><strong className="card-label-custom">Patient Name:</strong> {request.pName}</CardText>
                <CardText><strong className="card-label-custom">Secret Code:</strong> {request.secretCode}</CardText>
                <Button color="primary" onClick={() => handlePayment(request._id)}>Payment Process</Button>
              </CardBody>
              <CardFooter className="card-footer-custom">Approved</CardFooter>
            </Card>
          ))
        ) : (
          <p>No approved requests</p>
        )}
      </div>

      <Button color="secondary" onClick={handleBack}>Back</Button>
    </Container>
  );
}
