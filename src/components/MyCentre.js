
// // // import { useEffect } from "react";
// // // import axios from "../config/axios";
// // // import {  Link } from "react-router-dom";
// // // import { useAuth } from "../context/UserContext";
// // // import { Container, Row, Col, ListGroup, ListGroupItem, Button } from "reactstrap";
// // // import '../App.css'; // Import custom CSS file


// // // export default function MyCentre() {
// // //     const { dispatch, categories } = useAuth();

// // //     useEffect(() => {
// // //         (async () => {
// // //             try {
// // //                 const response = await axios.get(`/cateMyShow`, {
// // //                     headers: {
// // //                         Authorization: localStorage.getItem("token"),
// // //                     },
// // //                 });
// // //                 console.log("response", response.data);
// // //                 dispatch({ type: "CATEGORY", payload: { categories: response.data } });
// // //             } catch (error) {
// // //                 console.error("Error fetching categories:", error);
// // //             }
// // //         })();
// // //     }, [dispatch]);

   


// // //     return (
      
// // //         <Container className="my-4">
// // //             <h1 className="text-center mb-4">My Centre</h1>
// // //             <Row className="justify-content-center">
// // //                 <Col md={8}>
// // //                     <ListGroup>
// // //                         {categories.map((ele) => (
// // //                             <ListGroupItem key={ele._id} className="d-flex justify-content-between align-items-center">
// // //                                 <Link to={`/organShow/category/${ele._id}`} className="category-link">
// // //                                     {ele.catName}
// // //                                 </Link>
// // //                                 <Button color="info" tag={Link} to={`/organShow/category/${ele._id}`}>View Details</Button>
// // //                             </ListGroupItem>
// // //                         ))}
// // //                     </ListGroup>
// // //                 </Col>
// // //             </Row>
// // //         </Container>
       
// // //     );
// // // }
// // import { useEffect } from "react";
// // import axios from "../config/axios";
// // import { Link } from "react-router-dom";
// // import { useAuth } from "../context/UserContext";
// // import { Container, Row, Col, ListGroup, ListGroupItem, Button } from "reactstrap";
// // import '../App.css'; // Import custom CSS file

// // export default function MyCentre() {
// //     const { dispatch, categories } = useAuth();

// //     useEffect(() => {
// //         (async () => {
// //             try {
// //                 const response = await axios.get(`/cateMyShow`, {
// //                     headers: {
// //                         Authorization: localStorage.getItem("token"),
// //                     },
// //                 });
// //                 console.log("response", response.data);
// //                 dispatch({ type: "CATEGORY", payload: { categories: response.data } });
// //             } catch (error) {
// //                 console.error("Error fetching categories:", error);
// //             }
// //         })();
// //     }, [dispatch]);

// //     return (
// //         <Container className="container-custom">
// //             <h1 className="text-center">My Centre</h1>
// //             <Row className="justify-content-center">
// //                 <Col md={8}>
// //                     <ListGroup>
// //                         {categories.map((ele) => (
// //                             <ListGroupItem key={ele._id} className="list-group-item-custom">
// //                                 <Link to={`/organShow/category/${ele._id}`} className="category-link">
// //                                     {ele.catName}
// //                                 </Link>
// //                                 {/* <Button color="info" className="btn-info-custom" tag={Link} to={`/organShow/category/${ele._id}`}>
// //                                     View Details
// //                                 </Button> */}
// //                             </ListGroupItem>
// //                         ))}
// //                     </ListGroup>
// //                 </Col>
// //             </Row>
// //         </Container>
// //     );
// // }
// import { useEffect } from "react";
// import axios from "../config/axios";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/UserContext";
// import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
// import '../App.css'; // Import custom CSS file

// export default function MyCentre() {
//     const { dispatch, categories } = useAuth();

//     useEffect(() => {
//         (async () => {
//             try {
//                 const response = await axios.get(`/cateMyShow`, {
//                     headers: {
//                         Authorization: localStorage.getItem("token"),
//                     },
//                 });
//                 console.log("response", response.data);
//                 dispatch({ type: "CATEGORY", payload: { categories: response.data } });
//             } catch (error) {
//                 console.error("Error fetching categories:", error);
//             }
//         })();
//     }, [dispatch]);

//     return (
//         <Container className="container-custom">
//             <div className="image-container">
//                 {/* Optional: Add overlay text or other elements here */}
//             </div>
//             <div className="content-container">
//                 <h1 className="text-center">My Centre</h1>
//                 <Row className="justify-content-center">
//                     <Col md={12}>
//                         <ListGroup>
//                             {categories.map((ele) => (
//                                 <ListGroupItem key={ele._id} className="list-group-item-custom">
//                                     <Link to={`/organShow/category/${ele._id}`} className="category-link">
//                                         {ele.catName}
//                                     </Link>
//                                     {/* Optional: Add button if needed */}
//                                     {/* <Button color="info" className="btn-info-custom" tag={Link} to={`/organShow/category/${ele._id}`}>
//                                         View Details
//                                     </Button> */}
//                                 </ListGroupItem>
//                             ))}
//                         </ListGroup>
//                     </Col>
//                 </Row>
//             </div>
//         </Container>
//     );
// }
import { useEffect } from "react";
import axios from "../config/axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import '../App.css'; // Import scoped CSS file

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
        <Container className="mycentre-container">
            <div className="mycentre-image-container">
                {/* Optional: Add overlay text or other elements here */}
            </div>
            <div className="mycentre-content-container">
                <h1 className="mycentre-heading text-center">My Centre</h1>
                <Row className="justify-content-center">
                    <Col md={12}>
                        <ListGroup>
                            {categories.map((ele) => (
                                <ListGroupItem key={ele._id} className="mycentre-list-group-item">
                                    <Link to={`/organShow/category/${ele._id}`} className="mycentre-category-link">
                                        {ele.catName}
                                    </Link>
                                 
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}
