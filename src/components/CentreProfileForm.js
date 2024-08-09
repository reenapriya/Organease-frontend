

import { useState, useEffect } from "react";
import axios from "../config/axios";
import { useAuth } from "../context/UserContext";
import { Country, State, City } from 'country-state-city';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import '../App.css'; // Import custom CSS

export default function CentreProfileForm() {
  const { user, dispatch } = useAuth();
  const navigate = useNavigate();
  const [contact, setContact] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");
  const [door, setDoor] = useState("");
  const [serverErrors, setServerErrors] = useState(null);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [license, setLicense] = useState(null);

  useEffect(() => {
    const countriesData = Country.getAllCountries();
    setCountries(countriesData);
  }, []);

  useEffect(() => {
    if (country) {
      const statesData = State.getStatesOfCountry(country);
      setStates(statesData);
    } else {
      setStates([]);
      setState("");
    }
  }, [country]);

  useEffect(() => {
    if (state) {
      const citiesData = City.getCitiesOfState(country, state);
      setCities(citiesData);
    } else {
      setCities([]);
      setCity("");
    }
  }, [state]);

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
    setState("");
    setCity("");
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
    setCity("");
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleFileChange = (e) => {
    setLicense(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const centreFormData = new FormData();
    centreFormData.append("contact", contact);
    centreFormData.append("address[doorNo]", door);
    centreFormData.append("address[street]", street);
    centreFormData.append("address[country]", country);
    centreFormData.append("address[state]", state);
    centreFormData.append("address[city]", city);
    centreFormData.append("address[postalCode]", postalCode);
    centreFormData.append("license", license);

    try {
      const response = await axios.post("/register", centreFormData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data"
        }
      });
      console.log("centreProfile", response.data);

      const updatedCentreResponse = await axios.get("/showAll", {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });

      dispatch({ type: "CENTREPROFILE", payload: { centre: updatedCentreResponse.data } });
      navigate("/dashboard");
    } catch (error) {
      console.error(error); // Log error message to console
      setServerErrors(error.response?.data?.errors || ["An unexpected error occurred."]);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        
        <Col md={8}>
          <h2 className="text-center mb-4">Centre Profile Form</h2>
          {serverErrors && (
            <Alert color="danger">
              <h4 className="alert-heading">Server Errors</h4>
              <ul>
                {serverErrors.map((error, index) => (
                  <li key={index}>{error.msg}</li>
                ))}
              </ul>
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="contact">Contact:</Label>
              <Input
                type="text"
                name="contact"
                id="contact"
                value={contact}
                onChange={e => setContact(e.target.value)}
                placeholder="Enter contact number"
              />
            </FormGroup>
            <FormGroup>
              <Label for="door">Door Number:</Label>
              <Input
                type="text"
                name="door"
                id="door"
                value={door}
                onChange={e => setDoor(e.target.value)}
                placeholder="Enter door number"
              />
            </FormGroup>
            <FormGroup>
              <Label for="street">Street:</Label>
              <Input
                type="text"
                name="street"
                id="street"
                value={street}
                onChange={e => setStreet(e.target.value)}
                placeholder="Enter street name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="country">Country:</Label>
              <Input
                type="select"
                name="country"
                id="country"
                value={country}
                onChange={handleCountryChange}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="state">State:</Label>
              <Input
                type="select"
                name="state"
                id="state"
                value={state}
                onChange={handleStateChange}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="city">City:</Label>
              <Input
                type="select"
                name="city"
                id="city"
                value={city}
                onChange={handleCityChange}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.isoCode} value={city.isoCode}>{city.name}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="postalCode">Postal Code:</Label>
              <Input
                type="text"
                name="postalCode"
                id="postalCode"
                value={postalCode}
                onChange={e => setPostalCode(e.target.value)}
                placeholder="Enter postal code"
              />
            </FormGroup>
            <FormGroup>
              <Label for="license">Centre License:</Label>
              <Input
                type="file"
                name="license"
                id="license"
                onChange={handleFileChange}
              />
            </FormGroup>
            <Button type="submit" color="primary" block>Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

