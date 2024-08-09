


// import { useState, useEffect } from "react";
// import axios from "../config/axios";
// import { useParams } from "react-router-dom";
// import { useAuth } from "../context/UserContext";
// import {
//   Container, Form, FormGroup, Label, Input, Button, Row, Col
// } from 'reactstrap';
// import '../App.css';  // Import the CSS file

// export default function AddOrgan() {
//   const { oid } = useParams();
//   const { dispatch } = useAuth();

//   useEffect(() => {
//     console.log("Category ID:", oid);
//   }, [oid]);

//   const [dName, setdName] = useState("");
//   const [dAge, setdAge] = useState("");
//   const ages = Array.from({ length: 56 }, (_, i) => i + 18);
//   const [dWeight, setdWeight] = useState("");
//   const weight = Array.from({ length: 56 }, (_, i) => i + 45);
//   const [bloodType, setbloodType] = useState("");
//   const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
//   const [preserveSDate, setpreserveSDate] = useState("");
//   const [preserveEDate, setpreserveEDate] = useState("");
//   const [status, setstatus] = useState("");
//   const [oCertificate, setoCertificate] = useState("");
//   const [oprice, setoprice] = useState("");
//   const [secretCode, setSecretCode] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = {
//       dName,
//       dWeight,
//       dAge,
//       status,
//       bloodType,
//       oprice,
//       date: {
//         preserveSDate,
//         preserveEDate,
//       },
//       secretCode,
//     };

//     console.log("Form data being sent:", formData);

//     try {
//       const response = await axios.post(`/organcreate/category/${oid}`, formData, {
//         headers: {
//           Authorization: localStorage.getItem("token"),
//         },
//       });
//       console.log("Organ created successfully:", response.data);

//       // Fetch updated organ and update context
//       const updatedOrganResponse = await axios.get(`/organShow/category/${oid}`, {
//         headers: {
//           Authorization: localStorage.getItem("token"),
//         },
//       });

//       console.log("Updated organs:", updatedOrganResponse.data);
//       dispatch({ type: "ORGAN", payload: { organ: updatedOrganResponse.data } });
//     } catch (error) {
//       console.error("Error creating organ:", error.response?.data || error.message);
//     }
//     setbloodType("");
//     setdAge("");
//     setdName("");
//     setdWeight("");
//     setoprice("");
//     setstatus("");
//     setpreserveEDate("");
//     setpreserveSDate("");
//     setSecretCode("");
//     alert("Organ created successfully");
//   };

//   return (
//     <Container className="mt-5">
//       <Row>
//         <Col md={{ size: 6, offset: 3 }}>
//           <h2 className="text-center mb-4">Organ Details</h2>
//           <Form onSubmit={handleSubmit}>
//             <FormGroup>
//               <Label for="dName">Donor Name:</Label>
//               <Input
//                 type="text"
//                 name="dName"
//                 id="dName"
//                 value={dName}
//                 onChange={e => setdName(e.target.value)}
//                 className="select-option" 
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="dAge">Donor Age:</Label>
//               <Input
//                 type="select"
//                 name="dAge"
//                 id="dAge"
//                 value={dAge}
//                 onChange={e => setdAge(e.target.value)}
//                 className="select-option" 
//                    // Apply custom CSS class
//               >
//                 <option value="" disabled>Select Age</option>
//                 {ages.map(age => (
//                   <option key={age} value={age}>{age}</option>
//                 ))}
//               </Input>
//             </FormGroup>
//             <FormGroup>
//               <Label for="dWeight">Donor Weight:</Label>
//               <Input
//                 type="select"
//                 name="dWeight"
//                 id="dWeight"
//                 value={dWeight}
//                 onChange={e => setdWeight(e.target.value)}
//                 className="select-option"  // Apply custom CSS class
//               >
//                 <option value="" disabled>Select Weight</option>
//                 {weight.map(w => (
//                   <option key={w} value={w}>{w}</option>
//                 ))}
//               </Input>
//             </FormGroup>
//             <FormGroup>
//               <Label for="bloodType">Blood Type:</Label>
//               <Input
//                 type="select"
//                 name="bloodType"
//                 id="bloodType"
//                 value={bloodType}
//                 onChange={e => setbloodType(e.target.value)}
//                 className="select-option"  // Apply custom CSS class
//               >
//                 <option value="" disabled>Select Blood Type</option>
//                 {bloodTypes.map(type => (
//                   <option key={type} value={type}>{type}</option>
//                 ))}
//               </Input>
//             </FormGroup>
//             <FormGroup>
//               <Label for="preserveSDate">Preserve Start Date:</Label>
//               <Input
//                 type="date"
//                 name="preserveSDate"
//                 id="preserveSDate"
//                 value={preserveSDate}
//                 onChange={e => setpreserveSDate(e.target.value)}
//                 className="select-option" 
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="preserveEDate">Preserve End Date:</Label>
//               <Input
//                 type="date"
//                 name="preserveEDate"
//                 id="preserveEDate"
//                 value={preserveEDate}
//                 onChange={e => setpreserveEDate(e.target.value)}
//                 className="select-option" 
//               />
//             </FormGroup>
//             <FormGroup tag="fieldset">
//               <Label>Select a Status:</Label>
//               <FormGroup check inline>
//                 <Label check>
//                   <Input
//                     type="radio"
//                     name="status"
//                     value="Active"
//                     checked={status === 'Active'}
//                     onChange={e => setstatus(e.target.value)}
//                     className="select-option" 
//                   />
//                   Active
//                 </Label>
//               </FormGroup>
//               <FormGroup check inline>
//                 <Label check>
//                   <Input
//                     type="radio"
//                     name="status"
//                     value="InActive"
//                     checked={status === 'InActive'}
//                     onChange={e => setstatus(e.target.value)}
//                     className="select-option" 
//                   />
//                   InActive
//                 </Label>
//               </FormGroup>
//             </FormGroup>
//             <FormGroup>
//               <Label for="oprice">Price:</Label>
//               <Input
//                 type="text"
//                 name="oprice"
//                 id="oprice"
//                 value={oprice}
//                 onChange={e => setoprice(e.target.value)}
//                 className="select-option" 
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="secretCode">Secret Code:</Label>
//               <Input
//                 type="text"
//                 name="secretCode"
//                 id="secretCode"
//                 value={secretCode}
//                 onChange={e => setSecretCode(e.target.value)}
//                 className="select-option" 
//               />
//             </FormGroup>
//             <Button type="submit" color="primary" block className="submit-button">Save</Button>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// }
import { useState, useEffect } from "react";
import axios from "../config/axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import {
  Container, Form, FormGroup, Label, Input, Button, Row, Col
} from 'reactstrap';
import '../App.css';  // Import the CSS file


export default function AddOrgan() {
  const { oid } = useParams();
  const { dispatch } = useAuth();

  useEffect(() => {
    console.log("Category ID:", oid);
  }, [oid]);

  const [dName, setdName] = useState("");
  const [dAge, setdAge] = useState("");
  const ages = Array.from({ length: 56 }, (_, i) => i + 18);
  const [dWeight, setdWeight] = useState("");
  const weight = Array.from({ length: 56 }, (_, i) => i + 45);
  const [bloodType, setbloodType] = useState("");
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const [preserveSDate, setpreserveSDate] = useState("");
  const [preserveEDate, setpreserveEDate] = useState("");
  const [status, setstatus] = useState("");
  const [oCertificate, setoCertificate] = useState("");
  const [oprice, setoprice] = useState("");
  const [secretCode, setSecretCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      dName,
      dWeight,
      dAge,
      status,
      bloodType,
      oprice,
      date: {
        preserveSDate,
        preserveEDate,
      },
      secretCode,
    };

    console.log("Form data being sent:", formData);

    try {
      const response = await axios.post(`/organcreate/category/${oid}`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("Organ created successfully:", response.data);

      // Fetch updated organ and update context
      const updatedOrganResponse = await axios.get(`/organShow/category/${oid}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      console.log("Updated organs:", updatedOrganResponse.data);
      dispatch({ type: "ORGAN", payload: { organ: updatedOrganResponse.data } });
    } catch (error) {
      console.error("Error creating organ:", error.response?.data || error.message);
    }
    setbloodType("");
    setdAge("");
    setdName("");
    setdWeight("");
    setoprice("");
    setstatus("");
    setpreserveEDate("");
    setpreserveSDate("");
    setSecretCode("");
    alert("Organ created successfully");
  };




  return (
    
    <Container className="mt-5">
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <h2 className="text-center mb-4">Organ Details</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="dName">Donor Name:</Label>
              <Input
                type="text"
                name="dName"
                id="dName"
                value={dName}
                onChange={e => setdName(e.target.value)}
                className="select-option"
              />
            </FormGroup>
            <FormGroup>
              <Label for="dAge">Donor Age:</Label>
              <Input
                type="select"
                name="dAge"
                id="dAge"
                value={dAge}
                onChange={e => setdAge(e.target.value)}
                className="select-option"
              >
                <option value="" disabled>Select Age</option>
                {ages.map(age => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="dWeight">Donor Weight:</Label>
              <Input
                type="select"
                name="dWeight"
                id="dWeight"
                value={dWeight}
                onChange={e => setdWeight(e.target.value)}
                className="select-option"
              >
                <option value="" disabled>Select Weight</option>
                {weight.map(w => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="bloodType">Blood Type:</Label>
              <Input
                type="select"
                name="bloodType"
                id="bloodType"
                value={bloodType}
                onChange={e => setbloodType(e.target.value)}
                className="select-option"
              >
                <option value="" disabled>Select Blood Type</option>
                {bloodTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="preserveSDate">Preserve Start Date:</Label>
              <Input
                type="date"
                name="preserveSDate"
                id="preserveSDate"
                value={preserveSDate}
                onChange={e => setpreserveSDate(e.target.value)}
                className="select-option"
              />
            </FormGroup>
            <FormGroup>
              <Label for="preserveEDate">Preserve End Date:</Label>
              <Input
                type="date"
                name="preserveEDate"
                id="preserveEDate"
                value={preserveEDate}
                onChange={e => setpreserveEDate(e.target.value)}
                className="select-option"
              />
            </FormGroup>
            <FormGroup tag="fieldset">
              <Label>Select a Status:</Label>
              <FormGroup check inline>
                <Label check>
                  <Input
                    type="radio"
                    name="status"
                    value="Active"
                    checked={status === 'Active'}
                    onChange={e => setstatus(e.target.value)}
                    className="select-option"
                  />
                  Active
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input
                    type="radio"
                    name="status"
                    value="InActive"
                    checked={status === 'InActive'}
                    onChange={e => setstatus(e.target.value)}
                    className="select-option"
                  />
                  InActive
                </Label>
              </FormGroup>
            </FormGroup>
            <FormGroup>
              <Label for="oprice">Price:</Label>
              <Input
                type="text"
                name="oprice"
                id="oprice"
                value={oprice}
                onChange={e => setoprice(e.target.value)}
                className="select-option"
              />
            </FormGroup>
            <FormGroup>
              <Label for="secretCode">Secret Code:</Label>
              <Input
                type="text"
                name="secretCode"
                id="secretCode"
                value={secretCode}
                onChange={e => setSecretCode(e.target.value)}
                className="select-option"
              />
            </FormGroup>
            <Button type="submit" color="primary" block className="submit-button">Save</Button>
          </Form>
        </Col>
      </Row>
    </Container>
   
  );
}
