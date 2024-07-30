

import { useState } from "react";
import axios from "../config/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/UserContext";

export default function AddCategory() {
  //const {  oid } = useParams(); // Get route parameters
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const [catName, setCatName] = useState("");

  // Define category options
  const categories = ["heart", "lungs", "eyes", "tissue", "kidney"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      catName,
    };

    try {
      const response = await axios.post("/categorycreate", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      // Fetch updated categories and update context
      const updatedCategoryResponse = await axios.get("/cateShow", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      console.log("Updated categories:", updatedCategoryResponse.data);
      dispatch({ type: "CATEGORY", payload: { categories: updatedCategoryResponse.data } });
        const oid=response.data._id
      // Navigate to AddOrgan with id and oid parameters
      navigate(`/organcreate/category/${oid}`); // Ensure id and oid are defined

    } catch (error) {
      console.error("Error creating category:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1>Add Category</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="catName">Choose Category:</label>
        <select
          name="catName"
          id="catName"
          value={catName}
          onChange={(e) => setCatName(e.target.value)}
        >
          <option value="" disabled>Select Organ Type</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
