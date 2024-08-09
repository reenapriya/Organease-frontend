

import { useState } from "react";
import { useAuth } from "../context/UserContext";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";
import "../App.css"; // Import custom CSS

export default function HospitalProfile({toast} ) {
  
  const { user, dispatch } = useAuth();
  
  const [place, setPlace] = useState("");
  const [contact, setContact] = useState("");
  const [serverErrors, setServerErrors] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      place,
      contact,
      
    };
    try {
      const hospitalResponse = await axios.post("/hospitaldetails", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("hospitalResponse", hospitalResponse);

      const updatedHospitalResponse = await axios.get(`/hospitalShow`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      dispatch({
        type: "HOSPITALPROFILE",
        payload: { hospital: updatedHospitalResponse.data },
      });

      toast()
      navigate("/dashboard");
    } catch (error) {
      console.error(error); // Log error message to console
      setServerErrors(
        error.response?.data?.errors || ["An unexpected error occurred."]
      );
    }
  };

  return (
    <Container className="container-custom mt-5">
      <Row>
        <Col>
          <h2 className="form-header">Hospital Profile Details</h2>
          <h3 className="text-center mb-4">Kindly fill in these details, please!</h3>

          {serverErrors && (
            <Alert color="danger">
              <h4 className="alert-heading">Server Errors</h4>
              <ul className="error-list">
                {serverErrors.map((errors, index) => (
                  <li key={index}>{errors.msg}</li>
                ))}
              </ul>
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="place">Enter a place</Label>
              <Input
                type="text"
                name="place"
                id="place"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="Enter the place"
              />
            </FormGroup>
            <FormGroup>
              <Label for="contact">Contact No:</Label>
              <Input
                type="text"
                name="contact"
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Enter the contact number"
              />
            </FormGroup>
           
            <Button type="submit" color="primary" block>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
