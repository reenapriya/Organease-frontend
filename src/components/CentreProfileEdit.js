
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { useAuth } from "../context/UserContext";
import { Country, State, City } from 'country-state-city';
import { Form, FormGroup, Label, Input, Button, Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import '../App.css'; // Custom CSS file


export default function CentreProfileEdit() {
    const { id } = useParams();
    const { dispatch } = useAuth();
    const navigate = useNavigate();
    const [centreData, setCentreData] = useState(null);
    const [cName, setcName] = useState("");
    const [cEmail, setcEmail] = useState("");
    const [contact, setContact] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [street, setStreet] = useState("");
    const [door, setDoor] = useState("");

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const fetchCentreData = async () => {
            try {
                const response = await axios.get(`/showOne/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                setCentreData(response.data);
                setcEmail(response.data.cEmail);
                setcName(response.data.cName);
                setContact(response.data.contact);
                setDoor(response.data.address.doorNo);
                setStreet(response.data.address.street);
                setCountry(response.data.address.country);
                setState(response.data.address.state);
                setCity(response.data.address.city);
                setPostalCode(response.data.address.postalCode);
            } catch (error) {
                console.error("Error fetching centre data:", error);
            }
        };

        fetchCentreData();
    }, [id]);

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
    }, [state, country]);

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

    const handleSave = async (e) => {
        e.preventDefault();
        const updatedData = {
            cName,
            cEmail,
            contact,
            address: {
                doorNo: door,
                street,
                country,
                state,
                city,
                postalCode,
            },
        };

        try {
            const response = await axios.put(`/update/${id}`, updatedData, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            dispatch({ type: "CENTREPROFILE", payload: { centre: response.data } });
            navigate("/dashboard");
        } catch (error) {
            console.error("Error updating centre data:", error);
        }

        const updatedCentreResponse = await axios.get("/showAll", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });

        dispatch({ type: "CENTREPROFILE", payload: { centre: updatedCentreResponse.data } });
        navigate("/dashboard");
    };

    if (!centreData) {
        return <div>Loading...</div>;
    }



    return (
      
        <Container className="centre-profile-edit-container">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="centre-profile-card">
                        <CardBody>
                            <CardTitle tag="h2" className="text-center mb-4">Edit Centre Profile</CardTitle>
                            <Form onSubmit={handleSave}>
                                <FormGroup>
                                    <Label for="cName">Centre Name:</Label>
                                    <Input
                                        type="text"
                                        id="cName"
                                        value={cName}
                                        onChange={e => setcName(e.target.value)}
                                        className="custom-input"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="cEmail">Centre Email:</Label>
                                    <Input
                                        type="email"
                                        id="cEmail"
                                        value={cEmail}
                                        onChange={e => setcEmail(e.target.value)}
                                        className="custom-input"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="contact">Contact:</Label>
                                    <Input
                                        type="text"
                                        id="contact"
                                        value={contact}
                                        onChange={e => setContact(e.target.value)}
                                        className="custom-input"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="door">Door No:</Label>
                                    <Input
                                        type="text"
                                        id="door"
                                        value={door}
                                        onChange={e => setDoor(e.target.value)}
                                        placeholder="Enter door no."
                                        className="custom-input"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="street">Street Name:</Label>
                                    <Input
                                        type="text"
                                        id="street"
                                        value={street}
                                        onChange={e => setStreet(e.target.value)}
                                        placeholder="Enter street name"
                                        className="custom-input"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="country">Country:</Label>
                                    <Input
                                        type="select"
                                        id="country"
                                        value={country}
                                        onChange={handleCountryChange}
                                        className="custom-select"
                                    >
                                        <option value="">Select Country</option>
                                        {Country.getAllCountries().map((country) => (
                                            <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                                        ))}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="state">State:</Label>
                                    <Input
                                        type="select"
                                        id="state"
                                        value={state}
                                        onChange={handleStateChange}
                                        className="custom-select"
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
                                        id="city"
                                        value={city}
                                        onChange={handleCityChange}
                                        className="custom-select"
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
                                        id="postalCode"
                                        value={postalCode}
                                        onChange={e => setPostalCode(e.target.value)}
                                        placeholder="Enter postal code"
                                        className="custom-input"
                                    />
                                </FormGroup>
                                <Button type="submit" color="primary" className="custom-button">Save</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
 
    );
}

