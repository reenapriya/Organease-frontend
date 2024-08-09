
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { useAuth } from "../context/UserContext";
import {
    Container, Form, FormGroup, Label, Input, Button,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import '../App.css'; // Import your custom CSS file

export default function HospitalEdit() {
    const { id } = useParams();
    const { dispatch } = useAuth();
    const navigate = useNavigate();
    const [hospitalData, setHospitalData] = useState(null);
    const [hName, sethName] = useState("");
    const [hEmail, sethEmail] = useState("");
    const [contact, setContact] = useState("");
    const [place, setPlace] = useState("");
    const [modal, setModal] = useState(true);

    useEffect(() => {
        const fetchHospitalData = async () => {
            try {
                const response = await axios.get(`/hospitalShowOne/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                setHospitalData(response.data);
                sethEmail(response.data.hEmail);
                sethName(response.data.hName);
                setContact(response.data.contact);
                setPlace(response.data.place);
            } catch (error) {
                console.error("Error fetching hospital data:", error);
            }
        };

        fetchHospitalData();
    }, [id]);

    const handleSave = async (e) => {
        e.preventDefault();
        const updatedData = {
            hName,
            hEmail,
            contact,
            place,
        };

        try {
            const response = await axios.put(`/hospitalupdate/${id}`, updatedData, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            dispatch({ type: "HOSPITALPROFILE", payload: { hospital: response.data } });

            const updatedHospitalResponse = await axios.get("/hospitalShow", {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });

            dispatch({ type: "HOSPITALPROFILE", payload: { hospital: updatedHospitalResponse.data } });
            navigate("/dashboard");
        } catch (error) {
            console.error("Error updating hospital data:", error);
        }
    };

    const toggleModal = () => setModal(!modal);

    if (!hospitalData) {
        return <div>Loading...</div>;
    }

    return (
        <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal} className="form-containerEdit">Edit Hospital Profile</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSave}>
                    <FormGroup>
                        <Label for="hName" className="label-style">Hospital Name:</Label>
                        <Input
                            type="text"
                            id="hName"
                            value={hName}
                            onChange={e => sethName(e.target.value)}
                            placeholder="Enter hospital name"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="hEmail" className="label-style">Hospital Email:</Label>
                        <Input
                            type="email"
                            id="hEmail"
                            value={hEmail}
                            onChange={e => sethEmail(e.target.value)}
                            placeholder="Enter hospital email"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="contact" className="label-style">Contact:</Label>
                        <Input
                            type="text"
                            id="contact"
                            value={contact}
                            onChange={e => setContact(e.target.value)}
                            placeholder="Enter contact number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="place" className="label-style">Place:</Label>
                        <Input
                            type="text"
                            id="place"
                            value={place}
                            onChange={e => setPlace(e.target.value)}
                            placeholder="Enter place"
                        />
                    </FormGroup>
                    <Button color="primary" type="submit">Save</Button>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggleModal}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}
