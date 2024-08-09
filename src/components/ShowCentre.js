
import React, { useState } from 'react';
import axios from '../config/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';  // Import useAuth to get hospital details
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container, Form, FormGroup, Input, Button, Table, Alert, Label
} from 'reactstrap';

export default function ShowCentre() {
    const [organName, setOrganName] = useState('');
    const [organs, setOrgans] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { hospital } = useAuth(); // Get current hospital details from context

    const handleClick = (cid) => {
        navigate(`/showOne/${cid}`);
        console.log("cid", cid);
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.get(`/search?organ=${organName}`);
            console.log("response", response.data);
            setOrgans(response.data);
        } catch (err) {
            setError('An error occurred while fetching data.');
        }
    }

    const handleRequest = (id, oid) => {
        navigate(`/request/${oid}/${id}`);
    }

    // Function to format the date to YYYY-MM-DD
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }

    return (
        <Container className="mt-5">
            <h3 className="text-center mb-4">Search for the Organ You Need</h3>
            <Form onSubmit={handleSearch} className="d-flex justify-content-center mb-4">
                <FormGroup className="d-flex align-items-center">
                    <Label for="organName" hidden>Enter organ name</Label>
                    <Input
                        type="text"
                        id="organName"
                        placeholder="Enter organ name"
                        value={organName}
                        onChange={(e) => setOrganName(e.target.value)}
                        className="me-2"
                        style={{ width: '250px', fontWeight: 'bold' }}
                    />
                    <Button type="submit" color="success">Search</Button>
                </FormGroup>
            </Form>

            {error && <Alert color="danger">{error}</Alert>}

            {organs.length > 0 && (
                <>
                    <h3 className="text-center mb-4">Donor Details</h3>
                    <Table bordered hover responsive style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold' }}>
                        <thead>
                            <tr>
                                <th>Donor Name</th>
                                <th>Donor Age</th>
                                <th>Donor Weight</th>
                                <th>Blood Type</th>
                                <th>Status</th>
                                <th>Preserve Start Date</th>
                                <th>Preserve End Date</th>
                                <th>Secret Code</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {organs.map((organ) => {
                                // Check if the organ has already been requested
                                const isRequested = organ.isRequested || organ.sold; // Include a check for 'sold' status

                                return (
                                    !isRequested && (
                                        <tr key={organ._id}>
                                            <td>{organ.dName}</td>
                                            <td>{organ.dAge}</td>
                                            <td>{organ.dWeight}</td>
                                            <td>{organ.bloodType}</td>
                                            <td>{organ.status}</td>
                                            <td>{formatDate(organ.date.preserveSDate)}</td>
                                            <td>{formatDate(organ.date.preserveEDate)}</td>
                                            <td>{organ.secretCode}</td>
                                            <td>
                                                <Button color="info" size="sm" className="me-2" onClick={() => handleClick(organ.cid)}>Centre Name</Button>
                                                <Button color="primary" size="sm" onClick={() => handleRequest(organ._id, organ.oid)}>Request</Button>
                                            </td>
                                        </tr>
                                    )
                                );
                            })}
                        </tbody>
                    </Table>
                </>
            )}
        </Container>
    );
}
