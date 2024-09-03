


// import { useEffect, useState } from "react";
// import axios from "../config/axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { Table, Button, Container, Row, Col } from "reactstrap";
// import { useAuth } from "../context/UserContext";
// import moment from "moment";
// import '../App.css'; // Import the custom CSS file


// export default function ShowOrgan() {
//   const { organ, dispatch } = useAuth();
//   const { oid } = useParams();
//   const [today, setToday] = useState(moment());
//   const navigate = useNavigate();

//   useEffect(() => {
//     (async () => {
//       try {
//         const response = await axios.get(`organShow/category/${oid}`, {
//           headers: {
//             Authorization: localStorage.getItem("token"),
//           },
//         });
//         dispatch({ type: "ORGAN", payload: { organ: response.data } });
//       } catch (error) {
//         console.error("Error fetching organ data:", error);
//       }
//     })();

//     const intervalId = setInterval(() => {
//       setToday(moment());
//     }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

//     return () => clearInterval(intervalId); // Clear interval on component unmount
//   }, [dispatch, oid]);

//   const formatDate = (dateStr) => {
//     return moment(dateStr).format("YYYY-MM-DD");
//   };

//   const calculateDaysLeft = (endDateStr) => {
//     const endDate = moment(endDateStr);
//     const daysDiff = endDate.diff(today, "days");
//     return `${daysDiff} days left`;
//   };

//   const handleEdit = (id) => {
//     navigate(`/organUpdate/category/${oid}/organ/${id}`);
//   };

//   const handleRemove = async (id) => {
//     try {
//       await axios.delete(`/organRemove/category/${oid}/organ/${id}`, {
//         headers: {
//           Authorization: localStorage.getItem("token"),
//         },
//       });
//       navigate("/my-centre");
//     } catch (error) {
//       console.error("Error deleting organ:", error);
//     }
//   };

//   const handleClick = () => {
//     navigate("/my-centre");
//   };





//   return (
    
//     <Container className="my-4">
//       <h1 className="text-center mb-4">Show Organ</h1>
//       <Table bordered responsive>
//         <thead>
//           <tr>
//             <th>Donor Name</th>
//             <th>Donor Age</th>
//             <th>Donor Weight</th>
//             <th>Blood Type</th>
//             <th>Organ Name</th>
//             <th>Preserve Start Date</th>
//             <th>Preserve End Date</th>
//             <th>Status</th>
//             <th>Secret Code</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {organ.map((ele) => (
//             <tr key={ele._id}>
//               <td>{ele.dName}</td>
//               <td>{ele.dAge}</td>
//               <td>{ele.dWeight}</td>
//               <td>{ele.bloodType}</td>
//               <td>{ele.organName}</td>
//               <td>{formatDate(ele.date.preserveSDate)}</td>
//               <td>
//                 {formatDate(ele.date.preserveEDate)} (
//                 {calculateDaysLeft(ele.date.preserveEDate)})
//               </td>
//               <td>{ele.status}</td>
//               <td>{ele.secretCode}</td>
//               <td>
//                 <Button color="warning" onClick={() => handleEdit(ele._id)}>Edit</Button>
//                 <Button color="danger" onClick={() => handleRemove(ele._id)}>Remove</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//       <Row className="justify-content-center">
//         <Col md="auto">
//           <Button color="secondary" onClick={handleClick}>Back</Button>
//         </Col>
//       </Row>
//     </Container>
 
//   );
// }

import { useEffect, useState } from "react";
import axios from "../config/axios";
import { useParams, useNavigate } from "react-router-dom";
import { Table, Button, Container, Row, Col } from "reactstrap";
import { useAuth } from "../context/UserContext";
import moment from "moment";
import '../App.css'; // Import the custom CSS file

export default function ShowOrgan() {
  const { organ, dispatch } = useAuth();
  const { oid } = useParams();
  const [today, setToday] = useState(moment());
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`organShow/category/${oid}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        dispatch({ type: "ORGAN", payload: { organ: response.data } });
      } catch (error) {
        console.error("Error fetching organ data:", error);
      }
    })();

    const intervalId = setInterval(() => {
      setToday(moment());
    }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [dispatch, oid]);

  const formatDate = (dateStr) => {
    return moment(dateStr).format("YYYY-MM-DD");
  };

  const calculateDaysLeft = (endDateStr) => {
    const endDate = moment(endDateStr);
    const daysDiff = endDate.diff(today, "days");
    return `${daysDiff} days left`;
  };

  const handleEdit = (id) => {
    navigate(`/organUpdate/category/${oid}/organ/${id}`);
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`/organRemove/category/${oid}/organ/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      navigate("/my-centre");
    } catch (error) {
      console.error("Error deleting organ:", error);
    }
  };

  const handleClick = () => {
    navigate("/my-centre");
  };

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Show Organ</h1>
      <Table dark bordered responsive>
        <thead>
          <tr style={{color :"red"}}>
            <th>#</th>
            <th>Donor Name</th>
            <th>Donor Age</th>
            <th>Donor Weight</th>
            <th>Blood Type</th>
            <th>Organ Name</th>
            <th>Preserve Start Date</th>
            <th>Preserve End Date</th>
            <th>Status</th>
            <th>Secret Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {organ.map((ele, index) => (
            <tr key={ele._id}>
              <th scope="row">{index + 1}</th>
              <td>{ele.dName}</td>
              <td>{ele.dAge}</td>
              <td>{ele.dWeight}</td>
              <td>{ele.bloodType}</td>
              <td>{ele.organName}</td>
              <td>{formatDate(ele.date.preserveSDate)}</td>
              <td>
                {formatDate(ele.date.preserveEDate)} (
                {calculateDaysLeft(ele.date.preserveEDate)})
              </td>
              <td>{ele.status}</td>
              <td>{ele.secretCode}</td>
              <td>
                <Button color="success" onClick={() => handleEdit(ele._id)}>Edit</Button>
                <Button color="danger" onClick={() => handleRemove(ele._id)}>Remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row className="justify-content-center">
        <Col md="auto">
          <Button color="secondary" onClick={handleClick}>Back</Button>
        </Col>
      </Row>
    </Container>
  );
}

