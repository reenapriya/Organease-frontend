import axios from "../config/axios"
import { useAuth } from "../context/UserContext"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";

export default function OrganEdit() {
  const { oid, id } = useParams();

  // console.log("id",id)
  // console.log("oid",oid)
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dName: "",
    dAge: "",
    dWeight: "",
    bloodType: "",
    organName: "",
    preserveSDate: "",
    preserveEDate: "",
    status: "",
    secretCode:"",
    // oCertificate: null,
    oprice: "",
  })
  const ages = Array.from({ length: 56 }, (_, i) => i + 18);
  const weights = Array.from({ length: 56 }, (_, i) => i + 50);
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    const fetchOrganDetails = async () => {
      try {
        const response = await axios.get(`/organShowOne/category/${oid}/organ/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log("reee", response.data)
        const organ = response.data;
        setFormData({
          dName: organ.dName,
          dAge: organ.dAge,
          dWeight: organ.dWeight,
          bloodType: organ.bloodType,
          organName: organ.organName,
          preserveSDate: organ.date.preserveSDate,
          preserveEDate: organ.date.preserveEDate,
          status: organ.status,
          // oCertificate: organ.oCertificate,
          secretCode:organ.secretCode,
          oprice: organ.oprice,
        });

      } catch (error) {
        console.log(error);
      }
    };
    fetchOrganDetails();
  }, [oid, id]);
  console.log("pp", formData)
  const handleChange = (e) => {
    const { name, value, } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const formPayload = new FormData();
    // Object.keys(formData).forEach((key) => {
    //   formPayload.append(key, formData[key]);
    // });
    const formeditData = {
      dName: formData.dName,
      dAge: formData.dAge,
      dWeight: formData.dWeight,
      organName: formData.organName,
      bloodType: formData.bloodType,
      date: {
        preserveSDate: formData.preserveSDate,
        preserveEDate: formData.preserveEDate
      },

      oprice: formData.oprice,
      status: formData.status,
      secretCode:formData.secretCode

    }

    console.log("Form data being sent:", formeditData);;


    try {
      const editResponse = await axios.put(`/organUpdate/category/${oid}/organ/${id}`, formeditData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          //"Content-Type": "multipart/form-data",
        },
      });

      console.log("edit", editResponse.data);

      dispatch({ type: "ORGAN", payload: { organ: editResponse.data } });


      const updateMyResponse = await axios.get(`/organShow/category/${oid}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      dispatch({ type: "ORGAN", payload: { organ: updateMyResponse.data } });
      console.log("up", updateMyResponse)

      navigate(`/showOrgan`);

      setFormData({
        dName: "",
        dAge: "",
        dWeight: "",
        bloodType: "",
        organName: "",
        preserveSDate: "",
        preserveEDate: "",
        status: "",
        oCertificate: null,
        oprice: "",
        secretCode:""
      });

      alert("You successfully edited");
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <div>
      <h3>Editiing here</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="dName">Donor Name:</label>
        <input
          type="text"
          onChange={handleChange}
          name="dName"
          id="dName"
          value={formData.dName}
        />
        <br />
        <br />
        <label htmlFor="dAge">Donor Age:</label>
        <select
          name="dAge"
          id="dAge"
          value={formData.dAge}
          onChange={handleChange}
        >
          <option value="" disabled>Select Age</option>
          {ages.map((age) => (
            <option key={age} value={age}>{age}</option>
          ))}
        </select>
        <br />
        <br />
        <label htmlFor="organName">Organ Name:</label>
        <input
          type="text"
          onChange={handleChange}
          name="organName"
          id="organName"
          value={formData.organName}
        />
        <br />
        <br />
        <label htmlFor="dWeight">Donor Weight:</label>
        <select
          name="dWeight"
          id="dWeight"
          value={formData.dWeight}
          onChange={handleChange}
        >
          <option value="" disabled>Select Weight</option>
          {weights.map((w) => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>
        <br />
        <br />
        <label htmlFor="bloodType">Blood Type:</label>
        <select
          name="bloodType"
          id="bloodType"
          value={formData.bloodType}
          onChange={handleChange}
        >
          <option value="" disabled>Select Blood Type</option>
          {bloodTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <br />
        <br />
        <label htmlFor="preserveSDate">Preserve Start Date:</label>
        <input
          type="date"
          onChange={handleChange}
          name="preserveSDate"
          id="preserveSDate"
          value={formData.preserveSDate}
        />
        <br />
        <br />
        <label htmlFor="preserveEDate">Preserve End Date:</label>
        <input
          type="date"
          onChange={handleChange}
          name="preserveEDate"
          id="preserveEDate"
          value={formData.preserveEDate}
        />
        <br />
        <br />
        <h3>Select an Option:</h3>
        <input
          type="radio"
          id="Active"
          name="status"
          value="Active"
          checked={formData.status === 'Active'}
          onChange={handleChange}
        />
        <label htmlFor="Active">Active</label>
        <input
          type="radio"
          id="InActive"
          name="status"
          value="InActive"
          checked={formData.status === 'InActive'}
          onChange={handleChange}
        />
        <label htmlFor="InActive">InActive</label>

        <br />
        <br />
        {/* <label htmlFor="oCertificate">Approval Certificate:</label>
        <input
          type="file"
          onChange={handleChange}
          name="oCertificate"
          id="oCertificate"
        /> */}
        <br />
        <br />
        <br />
        <br />
        <label htmlFor="oprice">Price:</label>
        <input
          type="text"
          onChange={handleChange}
          name="oprice"
          id="oprice"
          value={formData.oprice}
        />
        <br />
        <br />
        <label htmlFor="secretCode">secretCode:</label>
        <input
          type="text"
          onChange={handleChange}
          name="secretCode"
          id="secretCode"
          value={formData.secretCode}
        />
        <br />
        <br />
        <input type="submit" value="save" />
      </form>
    </div>

  )
}