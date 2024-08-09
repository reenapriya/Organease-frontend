
import { useAuth } from "../context/UserContext";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { Container, Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';
import '../App.css'; // Import your custom CSS file


export default function OrganEdit() {
  const { oid, id } = useParams();
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    dName: "",
    dAge: "",
    dWeight: "",
    bloodType: "",
    organName: "",
    preserveSDate: "",
    preserveEDate: "",
    status: "",
    secretCode: "",
    oprice: "",
  });

  const ages = Array.from({ length: 56 }, (_, i) => i + 18);
  const weights = Array.from({ length: 56 }, (_, i) => i + 50);
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    const fetchOrganDetails = async () => {
      try {
        const response = await axios.get(`/organShowOne/category/${oid}/organ/${id}`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        const organ = response.data;
        setFormData({
          dName: organ.dName,
          dAge: organ.dAge,
          dWeight: organ.dWeight,
          bloodType: organ.bloodType,
          organName: organ.organName,
          preserveSDate: organ.date.preserveSDate,
          preserveEDate: organ.date.preserveEDate,
          status: organ.status,
          secretCode: organ.secretCode,
          oprice: organ.oprice,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrganDetails();
  }, [oid, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formeditData = {
      dName: formData.dName,
      dAge: formData.dAge,
      dWeight: formData.dWeight,
      organName: formData.organName,
      bloodType: formData.bloodType,
      date: {
        preserveSDate: formData.preserveSDate,
        preserveEDate: formData.preserveEDate
      },
      oprice: formData.oprice,
      status: formData.status,
      secretCode: formData.secretCode,
    };

    try {
      const editResponse = await axios.put(`/organUpdate/category/${oid}/organ/${id}`, formeditData, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      dispatch({ type: "ORGAN", payload: { organ: editResponse.data } });

      const updateMyResponse = await axios.get(`/organShow/category/${oid}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      dispatch({ type: "ORGAN", payload: { organ: updateMyResponse.data } });
      navigate(`/showOrgan`);

      setFormData({
        dName: "",
        dAge: "",
        dWeight: "",
        bloodType: "",
        organName: "",
        preserveSDate: "",
        preserveEDate: "",
        status: "",
        oprice: "",
        secretCode: "",
      });

      alert("You successfully edited");
    } catch (e) {
      console.log(e);
    }
  };


  return (
    
    <Container className="organ-edit-container">
      <h3 className="text-center">Editing Organ Details</h3>
      <Form onSubmit={handleSubmit}>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="dName">Donor Name:</Label>
              <Input
                type="text"
                name="dName"
                id="dName"
                value={formData.dName}
                onChange={handleChange}
                placeholder="Enter donor name"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="dAge">Donor Age:</Label>
              <Input
                type="select"
                name="dAge"
                id="dAge"
                value={formData.dAge}
                onChange={handleChange}
              >
                <option value="" disabled>Select Age</option>
                {ages.map(age => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="organName">Organ Name:</Label>
              <Input
                type="text"
                name="organName"
                id="organName"
                value={formData.organName}
                onChange={handleChange}
                placeholder="Enter organ name"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="dWeight">Donor Weight:</Label>
              <Input
                type="select"
                name="dWeight"
                id="dWeight"
                value={formData.dWeight}
                onChange={handleChange}
              >
                <option value="" disabled>Select Weight</option>
                {weights.map(weight => (
                  <option key={weight} value={weight}>{weight}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="bloodType">Blood Type:</Label>
              <Input
                type="select"
                name="bloodType"
                id="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
              >
                <option value="" disabled>Select Blood Type</option>
                {bloodTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="preserveSDate">Preserve Start Date:</Label>
              <Input
                type="date"
                name="preserveSDate"
                id="preserveSDate"
                value={formData.preserveSDate}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="preserveEDate">Preserve End Date:</Label>
              <Input
                type="date"
                name="preserveEDate"
                id="preserveEDate"
                value={formData.preserveEDate}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Organ Status:</Label>
              <div>
                <Input
                  type="radio"
                  id="Active"
                  name="status"
                  value="Active"
                  checked={formData.status === 'Active'}
                  onChange={handleChange}
                />
                <Label for="Active">Active</Label>
                <Input
                  type="radio"
                  id="InActive"
                  name="status"
                  value="InActive"
                  checked={formData.status === 'InActive'}
                  onChange={handleChange}
                />
                <Label for="InActive">InActive</Label>
              </div>
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="oprice">Price:</Label>
              <Input
                type="text"
                name="oprice"
                id="oprice"
                value={formData.oprice}
                onChange={handleChange}
                placeholder="Enter price"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="secretCode">Secret Code:</Label>
              <Input
                type="text"
                name="secretCode"
                id="secretCode"
                value={formData.secretCode}
                onChange={handleChange}
                placeholder="Enter secret code"
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary" type="submit">Save</Button>
      </Form>
    </Container>
   
  );
}
