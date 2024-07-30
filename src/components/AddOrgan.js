import { useState, useEffect } from "react";
import axios from "../config/axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/UserContext";

export default function AddOrgan() {
  const {  oid } = useParams();
  const {dispatch}=useAuth()

  useEffect(() => {
    
    console.log("Category ID:", oid);
  }, [ oid]);

  const [dName, setdName] = useState("");
  const [dAge, setdAge] = useState("");
  const ages = Array.from({ length: 56 }, (_, i) => i + 18);
  const [dWeight, setdWeight] = useState("");
  const weight = Array.from({ length: 56 }, (_, i) => i + 45);
  const [bloodType, setbloodType] = useState("");
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const [preserveSDate, setpreserveSDate] = useState("");
  const [preserveEDate, setpreserveEDate] = useState("");
  const [status, setstatus] = useState("");
  const [oCertificate, setoCertificate] = useState("");
  const [oprice, setoprice] = useState("");
  const [secretCode,setSecretCode]=useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      dName,
      dWeight,
      dAge,
      status,
      bloodType,
      oprice,
      date: {
        preserveSDate,
        preserveEDate,
      },
      secretCode,
    };

    console.log("Form data being sent:", formData);

    try {
      const response = await axios.post(`/organcreate/category/${oid}`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("Organ created successfully:", response.data);


      // Fetch updated organ and update context
      const updatedOrganResponse = await axios.get(`/organShow/category/${oid}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      console.log("Updated organs:", updatedOrganResponse.data);
      dispatch({ type: "ORGAN", payload: { organ: updatedOrganResponse.data } });
    } catch (error) {
      console.error("Error creating organ:", error.response?.data || error.message);
    }
    setbloodType("")
    setdAge("")
    setdName("")
    setdWeight("")
    setoprice("")
    setstatus("")
    setpreserveEDate("")
    setpreserveSDate("")
    setSecretCode("")
    alert(" you successfully created ")
  };

  return (
    <div>
      <h2>Organ Details</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="dName">Donor Name:</label>
        <input
          type="text"
          onChange={e => setdName(e.target.value)}
          name="dName"
          id="dName"
          value={dName}
        />
        <br />
        <br />
        <label htmlFor="dAge">Donor Age:</label>
        <select
          name="dAge"
          id="dAge"
          value={dAge}
          onChange={e => setdAge(e.target.value)}
        >
          <option value="" disabled>Select Age</option>
          {ages.map(age => (
            <option key={age} value={age}>{age}</option>
          ))}
        </select>
        <br />
        <br />
        <label htmlFor="dWeight">Donor Weight:</label>
        <select
          name="dWeight"
          id="dWeight"
          value={dWeight}
          onChange={e => setdWeight(e.target.value)}
        >
          <option value="" disabled>Select Weight</option>
          {weight.map(w => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>
        <br />
        <br />
        <label htmlFor="bloodType">Blood Type:</label>
        <select
          name="bloodType"
          id="bloodType"
          value={bloodType}
          onChange={e => setbloodType(e.target.value)}
        >
          <option value="" disabled>Select Blood Type</option>
          {bloodTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <br />
        <br />
        <label htmlFor="preserveSDate">Preserve Start Date:</label>
        <input
          type="date"
          onChange={e => setpreserveSDate(e.target.value)}
          name="preserveSDate"
          id="preserveSDate"
          value={preserveSDate}
        />
        <br />
        <br />
        <label htmlFor="preserveEDate">Preserve End Date:</label>
        <input
          type="date"
          onChange={e => setpreserveEDate(e.target.value)}
          name="preserveEDate"
          id="preserveEDate"
          value={preserveEDate}
        />
        <br />
        <br />
        <h3>Select an Status:</h3>
        <input
          type="radio"
          id="Active"
          name="status"
          value="Active"
          checked={status === 'Active'}
          onChange={(e) => setstatus(e.target.value)}
        />
        <label htmlFor="Active">Active</label>

        <input
          type="radio"
          id="InActive"
          name="status"
          value="InActive"
          checked={status === 'InActive'}
          onChange={(e) => setstatus(e.target.value)}
        />
        <label htmlFor="InActive">InActive</label>

        <br />
        <br />
      
        <br />
        <br />
        
        <label htmlFor="oprice">Price:</label>
        <input
          type="text"
          onChange={e => setoprice(e.target.value)}
          name="oprice"
          id="oprice"
          value={oprice}
        />
        <br />
        <br />
        <label htmlFor="secretCode">secretCode:</label>
        <input
          type="text"
          onChange={e => setSecretCode(e.target.value)}
          name="secretCode"
          id="secretCode"
          value={secretCode}
        />
        <br />
        <br />
        <input type="submit" value="save"/>
      </form>
    </div>
  );
}

