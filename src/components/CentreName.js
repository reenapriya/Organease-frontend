
import { useParams } from "react-router-dom";
import axios from "../config/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CentreName() {
    const navigate=useNavigate()
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

    const handleBack=()=>{
        navigate("/show-centre")
    }

    return (
        <div>
            <h2>Confirmation Details for send to centre</h2>
            {centre && (
                <div key={centre._id}>
                    <h3>CENTRE NAME : {centre.cName.toUpperCase()}</h3>
                    <ul>
                        <li>Centre Email - {centre.cEmail}</li>
                        <li>Centre Contact No - {centre.contact}</li>
                        <li>Address </li>
                        <li>Door No-{centre.address.doorNo}</li>
                        <li>Street Name:{centre.address.street}</li>
                        <li>City :{centre.address.city}</li>
                        <li>State:{centre.address.state}</li>
                        <li>Country:{centre.address.country}</li>
                        <li>PostalCode-{centre.address.postalCode}</li>
                    </ul>
                </div>
            )}

              <button onClick={handleBack}>Back</button>
        </div>
    );
}
