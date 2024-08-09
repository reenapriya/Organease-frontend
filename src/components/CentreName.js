
import { useParams } from "react-router-dom";
import axios from "../config/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem } from 'reactstrap';
import centreName from "../Assests/centreName.png"

export default function CentreName() {
    const navigate = useNavigate();
    const [centre, setCentre] = useState(null);  // Initialize as null or an empty object
    const { cid } = useParams();
    console.log("iid", cid);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`/showOne/${cid}`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                console.log("cc", response.data);
                setCentre(response.data);
            } catch (error) {
                console.error("Error fetching centre details:", error);
            }
        })();
    }, [cid]);

    const handleBack = () => {
        navigate("/show-centre");
    }


    // Background image style
    const backgroundStyle = {
        backgroundImage: `url(${centreName})`, // Use the imported image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
    };

    return (
        <div style={backgroundStyle}>
        <Container className="mt-5" >
            <Row>
                <Col md={{ size: 8, offset: 2 }}>
                    <h2 className="text-center mb-4">Details About Centre</h2>
                    {centre && (
                        <Card>
                            <CardBody>
                                <CardTitle tag="h3" className="text-primary">{centre.cName.toUpperCase()}</CardTitle>
                                <CardText>
                                    <ListGroup>
                                        <ListGroupItem><strong>Centre Email:</strong> {centre.cEmail}</ListGroupItem>
                                        <ListGroupItem><strong>Centre Contact No:</strong> {centre.contact}</ListGroupItem>
                                        <ListGroupItem><strong>Address:</strong></ListGroupItem>
                                        <ListGroupItem><strong>Door No:</strong> {centre.address.doorNo}</ListGroupItem>
                                        <ListGroupItem><strong>Street Name:</strong> {centre.address.street}</ListGroupItem>
                                        <ListGroupItem><strong>City:</strong> {centre.address.city}</ListGroupItem>
                                        <ListGroupItem><strong>State:</strong> {centre.address.state}</ListGroupItem>
                                        <ListGroupItem><strong>Country:</strong> {centre.address.country}</ListGroupItem>
                                        <ListGroupItem><strong>Postal Code:</strong> {centre.address.postalCode}</ListGroupItem>
                                    </ListGroup>
                                </CardText>
                                <Button color="primary" onClick={handleBack}>Back</Button>
                            </CardBody>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
        </div>
    );
}
