import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { useAuth } from "../context/UserContext";
export default function HospitalEdit(){
    const { id } = useParams();
    const { dispatch } = useAuth();
    const navigate = useNavigate();
    const [hospitalData, setHospitalData] = useState(null)
    const [hName, sethName] = useState("");
    const [hEmail, sethEmail] = useState("");
    const [contact, setContact] = useState("");
    const [authCertificate,setauthCertificate]=useState("")
    const [place,setPlace]=useState("")


    useEffect(() => {
        const fetchHospitalData = async () => {
            try {
                const response = await axios.get(`/hospitalShowOne/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                setHospitalData(response.data);
                sethEmail(response.data.hEmail);
                sethName(response.data.hName);
                setContact(response.data.contact);
                setauthCertificate(response.data.authCertificate)
                setPlace(response.data.place)
            } catch (error) {
                console.error("Error fetching centre data:", error);
            }
        };

        fetchHospitalData();
    }, [id]);




    const handleSave = async (e) => {
        e.preventDefault();
        const updatedData = {
            hName,
            hEmail,
            contact,
            place,
            authCertificate
            
        };

        try {
            const response = await axios.put(`/hospitalupdate/${id}`, updatedData, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            dispatch({ type: "HOSPITALPROFILE", payload: { hospital: response.data } });
            navigate("/dashboard");

        } catch (error) {
            console.error("Error updating hospital data:", error);
        }

        const updatedHospitalResponse = await axios.get("/hospitalShow", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });

        dispatch({ type: "HOSPITALPROFILE", payload: { hospital: updatedHospitalResponse.data } });
        navigate("/dashboard");

    };

    if (!hospitalData) {
        return <div>Loading...</div>;
    }
    return(
        <div>
             <h2>Edit Hospiatl Profile</h2>
            <form onSubmit={handleSave}>
                <label>Hospiat Name:</label>
                <input
                    type="text"
                    value={hName}
                    onChange={e => sethName(e.target.value)}
                />
                <br />
                <br />

                <label>Hospital Email:</label>
                <input
                    type="text"
                    value={hEmail}
                    onChange={e => sethEmail(e.target.value)}
                />
                <br />
                <br />
                <label>Contact:</label>
                <input
                    type="text"
                    value={contact}
                    onChange={e => setContact(e.target.value)}
                />
                <br />
                <br />
                <label>Place</label>
                <input
                    type="text"
                    value={place}
                    onChange={e => setPlace(e.target.value)}
                />
                <br />
                <br />

                <label>Provide Authenticate Certificate</label>
                <input
                    type="text"
                    value={authCertificate}
                    onChange={e => setauthCertificate(e.target.value)}
                />
                <br />
                <br />
                <button type="submit">Save</button>
                </form>
        </div>

    )

}