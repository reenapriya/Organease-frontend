import { useEffect, useState } from "react"
import axios from "../config/axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function ShowOrgan() {
  const { organ, dispatch } = useAuth();
  const { oid, id } = useParams();
  console.log("oid", oid)
  const [today, setToday] = useState(moment());
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`organShow/category/${oid}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log("eee", response.data)
        dispatch({ type: "ORGAN", payload: { organ: response.data } });
      } catch (error) {
        console.error("Error fetching organ data:", error);
      }
    })();

    // Update the current date every day
    const intervalId = setInterval(() => {
      setToday(moment());
    }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [dispatch, oid]);

  const formatDate = (dateStr) => {
    return moment(dateStr).format("YYYY-MM-DD");
  };

  const calculateDaysLeft = (endDateStr) => {
    const endDate = moment(endDateStr);
    const daysDiff = endDate.diff(today, "days");
    return `${daysDiff} days left`;
  };

  const handleEdit = (id, oid) => {
    navigate(`/organUpdate/category/${oid}/organ/${id}`)
    //navigate(`/organ-edit /${oid}/organ/${id}`)

  }

  const handleRemove = async (id, oid) => {

    try {
      await axios.delete(`/organRemove/category/${oid}/organ/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      navigate("/my-centre")

    } catch (error) {
      console.error("Error deleting user:", error);
    }

  }

const handleClick=()=>{
  navigate("/my-centre")
}
  return (
    <div>
      <h1>Show Organ</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Donor Name:</th>
            <th>Donor Age</th>
            <th>Donor Weight</th>
            <th>Blood Type</th>
            <th>Organ Name</th>
            <th>Preserve Start Date</th>
            <th>Preserve End Date</th>
            <th>Status</th>
            <th>secretCode</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {organ.map((ele) => (

            <tr key={ele._id}>
              <td>{ele.dName}</td>
              <td>{ele.dAge}</td>
              <td>{ele.dWeight}</td>
              <td>{ele.bloodType}</td>
              <td>{ele.organName}</td>
              <td>{formatDate(ele.date.preserveSDate)}</td>
              <td>
                {formatDate(ele.date.preserveEDate)} (
                {calculateDaysLeft(ele.date.preserveEDate)})
              </td>
              <td>{ele.status}</td>
              <td>{ele.secretCode}</td>
              <button onClick={() => { handleEdit(ele._id, ele.oid) }}>Edit</button>
              <button onClick={() => { handleRemove(ele._id, ele.oid) }}>Remove</button>
            </tr>

          ))}
        </tbody>
      </table>
      <button onClick={handleClick}>Back</button>
    </div>
  );
}


// // {/* <h3>{ele.dName}</h3>
// // <ul> <li key={ele._id}>{ele.dAge}</li>
// //    <li >{ele.bloodType}</li>
// //  </ul> */}