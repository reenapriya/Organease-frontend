
import { useEffect, useState } from "react";
import axios from "../config/axios";
import { useAuth } from "../context/UserContext";
import { useParams } from "react-router-dom";

export default function CentreSideRequest() {
  const { dispatch, centre, request } = useAuth();
  const [requestCentre, setRequestCentre] = useState([]);

  const { id } = useParams(); // Assuming you have an ID in the URL params

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/centreMyshow`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        const cid = response.data._id;

        const requestcentreResponse = await axios.get(`/centrerequestShow/${cid}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        console.log("requestCentre", requestcentreResponse.data);
        setRequestCentre(requestcentreResponse.data);
      } catch (error) {
        console.error("Error fetching request centre data", error);
      }
    })();
  }, [id]);

  const handleCheckboxChange = async (requestId, newStatus) => {
    setRequestCentre((prev) =>
      prev.map((request) =>
        request._id === requestId ? { ...request, isApproved: newStatus } : request
      )
    );

    try {
      await axios.put(`/centrerequestUpdate/${requestId}`, {
        isApproved: newStatus,
      }, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      alert("Approval status updated and email sent!");
    } catch (error) {
      console.error("Error updating approval status", error);
    }
  };

  return (
    <div>
       <h4>Request Get From Hospital</h4>
       {requestCentre.map((request) => (
         <div key={request._id}>
           <p>Hospital Name: {request.hospital.hName}</p>
           <p>Hospital Email: {request.hospital.hEmail}</p>
           <p>Secret Code: {request.secretCode}</p>
           <p>
             Is Approved: 
             <input 
               type="checkbox" 
               checked={request.isApproved} 
               onChange={(e) => handleCheckboxChange(request._id, e.target.checked)} 
             />
           </p>
         </div>
       ))}
    </div>
  );
}
