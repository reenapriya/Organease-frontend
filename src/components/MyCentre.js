
import { useEffect } from "react";
import axios from "../config/axios";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { Container, Row, Col, ListGroup, ListGroupItem, Button } from "reactstrap";
import '../App.css'; // Import custom CSS file


export default function MyCentre() {
    const { dispatch, categories } = useAuth();

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`/cateMyShow`, {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                });
                console.log("response", response.data);
                dispatch({ type: "CATEGORY", payload: { categories: response.data } });
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        })();
    }, [dispatch]);

   


    return (
      
        <Container className="my-4">
            <h1 className="text-center mb-4">My Centre</h1>
            <Row className="justify-content-center">
                <Col md={8}>
                    <ListGroup>
                        {categories.map((ele) => (
                            <ListGroupItem key={ele._id} className="d-flex justify-content-between align-items-center">
                                <Link to={`/organShow/category/${ele._id}`} className="category-link">
                                    {ele.catName}
                                </Link>
                                <Button color="info" tag={Link} to={`/organShow/category/${ele._id}`}>View Details</Button>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
       
    );
}
