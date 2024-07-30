
import { useAuth } from "../context/UserContext";
import CentreProfileForm from "./CentreProfileForm";
import HospitalProfile from "./HospitalProfile";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import account from "../Assests/account.jpg";

export default function Dashboard() {
    const { user, centre, dispatch, hospital } = useAuth();
    const navigate = useNavigate();

    console.log("user", user);
    console.log("centre", centre);
    console.log("hospital", hospital);

    if (!user) {
        return <div className="container"><div className="alert alert-info">Loading...</div></div>;
    }

    const userData = user.data ? user.data : user;
    console.log("userData", userData);

    // Find the correct centre profile based on the logged-in user's ID
    const userCentre = Array.isArray(centre) ? centre.find(c => c.userId === userData._id) : null;
    console.log("userCentre", userCentre);

    // Find the correct hospital profile based on the logged-in user's ID
    const userHospital = Array.isArray(hospital) ? hospital.find(h => h.userId === userData._id) : null;
    console.log("userHospital", userHospital);

    const handleEdit = (id) => {
        navigate(`/centreprofileedit/${id}`);
    };

    const handleRemove = async (id) => {
        try {
            await axios.delete(`/delete/${userData._id}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            dispatch({ type: "LOGOUT" });
            navigate('/login');
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleHosEdit = (id) => {
        navigate(`/hospitalprofileedit/${id}`);
    };

    const handleHosRemove = async (id) => {
        try {
            await axios.delete(`/hospitalDelete/${userData._id}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            dispatch({ type: "LOGOUT" });
            navigate('/login');
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const backgroundStyle = {
        backgroundImage: `url(${account})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const handleClick=()=>{
        navigate("/")
    }

    return (
        <div style={backgroundStyle}>
            <div className="container mt-4">
                <h2 className="mb-4">Account Info</h2>
                {user && (
                    <div className="mb-4">
                        <p><strong>Name:</strong> {userData.name}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>Role:</strong> {userData.role}</p>
                    </div>
                )}

                {userData.role === 'Centre' ? (
                    userCentre ? (
                        <div className="mb-4">
                            <h3 className="mb-3">Centre Details</h3>
                            <p><strong>Contact:</strong> {userCentre.contact}</p>
                            <p><strong>Address:</strong></p>
                            {userCentre.address ? (
                                <div className="mb-3">
                                    <p><strong>Door No:</strong> {userCentre.address.doorNo}</p>
                                    <p><strong>Street Name:</strong> {userCentre.address.street}</p>
                                    <p><strong>City:</strong> {userCentre.address.city}</p>
                                    <p><strong>State:</strong> {userCentre.address.state}</p>
                                    <p><strong>Country:</strong> {userCentre.address.country}</p>
                                    <p><strong>Postal Code:</strong> {userCentre.address.postalCode}</p>
                                </div>
                            ) : (
                                <p>No address available</p>
                            )}
                            {userCentre.license && (
                                <div className="mb-3">
                                    <p><strong>License:</strong></p>
                                    <a href={userCentre.license} target="_blank" rel="noopener noreferrer">
                                        View License
                                    </a>
                                </div>
                            )}
                            <button className="btn btn-primary me-2" onClick={() => handleEdit(userCentre._id)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleRemove(userCentre._id)}>Remove</button>
                        </div>
                    ) : (
                        <div className="mb-4">
                            <h3 className="mb-3">Create Centre Profile</h3>
                            <CentreProfileForm />
                        </div>
                    )
                ) : (
                    userHospital ? (
                        <div className="mb-4">
                            <h3 className="mb-3">Hospital Details</h3>
                            <p><strong>Name:</strong> {userHospital.hName}</p>
                            <p><strong>Email:</strong> {userHospital.hEmail}</p>
                            <p><strong>Auth Certificate:</strong> {userHospital.authCertificate}</p>
                            <p><strong>Contact:</strong> {userHospital.contact}</p>
                            <p><strong>Place:</strong> {userHospital.place}</p>
                            <button className="btn btn-primary me-2" onClick={() => handleHosEdit(userHospital._id)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleHosRemove(userHospital._id)}>Remove</button>
                        </div>
                    ) : (
                        <div className="mb-4">
                            <h3 className="mb-3">Create Hospital Profile</h3>
                            <HospitalProfile />
                        </div>
                    )
                )}
                <button onClick={handleClick}>Back</button>
            </div>
        </div>
    );
}
