import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { Form, FormGroup, Label, Input, Button, Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import '../App.css'; // Custom CSS file

export default function AddCategory() {
  const [oid, setOid] = useState("");
  const [categories, setCategories] = useState([]);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/cateShow", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error.response?.data || error.message);
      }
    };
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    try {
      const response = await axios.post("/categorycreate", { catName: newCategoryName }, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const newCategory = response.data;
      setCategories([...categories, newCategory]);
      setOid(newCategory._id); // Set the new category as the selected one
      setShowAddCategoryForm(false);
    } catch (error) {
      console.error("Error adding category:", error.response?.data || error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (oid) {
      navigate(`/organcreate/category/${oid}`);
    }
  };

  return (
    <Container className="choose-category-container">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="category-card">
            <CardBody>
              <CardTitle tag="h1" className="text-center mb-4">Choose Category</CardTitle>
              <Form className="category-form" onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="oid">Select Category:</Label>
                  <Input
                    type="select"
                    name="oid"
                    id="oid"
                    value={oid}
                    onChange={(e) => setOid(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select Organ Type</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.catName}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <Button color="primary" type="submit" block>
                  Next
                </Button>
                <Button color="secondary" onClick={() => setShowAddCategoryForm(!showAddCategoryForm)} block>
                  {showAddCategoryForm ? "Cancel" : "Add New Category"}
                </Button>
              </Form>
              {showAddCategoryForm && (
                <Form className="add-category-form mt-3">
                  <FormGroup>
                    <Label for="newCategoryName">New Category Name:</Label>
                    <Input
                      type="text"
                      name="newCategoryName"
                      id="newCategoryName"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <Button color="success" onClick={handleAddCategory} block>
                    Add Category
                  </Button>
                </Form>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

