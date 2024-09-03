

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { useAuth } from '../context/UserContext';
import {
    Form, FormGroup, Label, Input, Button,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { Country, State, City } from 'country-state-city';
import '../App.css'; // Import your custom CSS file

export default function CentreProfileEdit() {
    const { id } = useParams();
    const { dispatch } = useAuth();
    const navigate = useNavigate();
    const [centreData, setCentreData] = useState(null);
    const [cName, setCName] = useState("");
    const [cEmail, setCEmail] = useState("");
    const [contact, setContact] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [street, setStreet] = useState("");
    const [door, setDoor] = useState("");
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [modal, setModal] = useState(true);

    useEffect(() => {
        const fetchCentreData = async () => {
            try {
                const response = await axios.get(`/ShowOne/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                setCentreData(response.data);
                setCName(response.data.cName);
                setCEmail(response.data.cEmail);
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
            setCities([]);
            setCity("");
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

            const updatedCentreResponse = await axios.get("/showAll", {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });

            dispatch({ type: "CENTREPROFILE", payload: { centre: updatedCentreResponse.data } });
            navigate("/dashboard");
        } catch (error) {
            console.error("Error updating centre data:", error);
        }
    };

    const toggleModal = () => setModal(!modal);

    if (!centreData) {
        return <div>Loading...</div>;
    }

    return (
        <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal} className="form-containerEdit">Edit Centre Profile</ModalHeader>
            <ModalBody className='form-body'>
                <Form onSubmit={handleSave}>
                    <FormGroup>
                        <Label for="cName" style={{ fontWeight: 'bolder', fontFamily: 'Georgia, serif', marginBottom: '0.5rem', color: '#333',fontSize:'larger' }}>Centre Name:</Label>
                        <Input
                            type="text"
                            id="cName"
                            value={cName}
                            onChange={e => setCName(e.target.value)}
                            placeholder="Enter centre name"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="cEmail" style={{ fontWeight: 'bolder', fontFamily: 'Georgia, serif', marginBottom: '0.5rem', color: '#333',fontSize:'larger' }} >Centre Email:</Label>
                        <Input
                            type="email"
                            id="cEmail"
                            value={cEmail}
                            onChange={e => setCEmail(e.target.value)}
                            placeholder="Enter centre email"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="contact" style={{ fontWeight: 'bolder', fontFamily: 'Georgia, serif', marginBottom: '0.5rem', color: '#333',fontSize:'larger' }}>Contact:</Label>
                        <Input
                            type="text"
                            id="contact"
                            value={contact}
                            onChange={e => setContact(e.target.value)}
                            placeholder="Enter contact number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="door" style={{ fontWeight: 'bolder', fontFamily: 'Georgia, serif', marginBottom: '0.5rem', color: '#333',fontSize:'larger' }}>Door No:</Label>
                        <Input
                            type="text"
                            id="door"
                            value={door}
                            onChange={e => setDoor(e.target.value)}
                            placeholder="Enter door no."
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="street" style={{ fontWeight: 'bolder', fontFamily: 'Georgia, serif', marginBottom: '0.5rem', color: '#333',fontSize:'larger' }}>Street Name:</Label>
                        <Input
                            type="text"
                            id="street"
                            value={street}
                            onChange={e => setStreet(e.target.value)}
                            placeholder="Enter street name"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="country" style={{ fontWeight: 'bolder', fontFamily: 'Georgia, serif', marginBottom: '0.5rem', color: '#333',fontSize:'larger' }} >Country:</Label>
                        <Input
                            type="select"
                            id="country"
                            value={country}
                            onChange={handleCountryChange}
                        >
                            <option value="">Select Country</option>
                            {Country.getAllCountries().map((country) => (
                                <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="state" style={{ fontWeight: 'bolder', fontFamily: 'Georgia, serif', marginBottom: '0.5rem', color: '#333',fontSize:'larger' }}>State:</Label>
                        <Input
                            type="select"
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
                        <Label for="city" style={{ fontWeight: 'bolder', fontFamily: 'Georgia, serif', marginBottom: '0.5rem', color: '#333',fontSize:'larger' }}>City:</Label>
                        <Input
                            type="select"
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
                        <Label for="postalCode" style={{ fontWeight: 'bolder', fontFamily: 'Georgia, serif', marginBottom: '0.5rem', color: '#333',fontSize:'larger' }}>Postal Code:</Label>
                        <Input
                            type="text"
                            id="postalCode"
                            value={postalCode}
                            onChange={e => setPostalCode(e.target.value)}
                            placeholder="Enter postal code"
                        />
                    </FormGroup>
                    <Button color="primary" type="submit">Save</Button>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={toggleModal}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}
