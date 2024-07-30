import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { useAuth } from "../context/UserContext";
import { Country, State, City } from 'country-state-city';

export default function CentreProfileEdit() {
    const { id } = useParams();
    const { dispatch } = useAuth();
    const navigate = useNavigate();
    const [centreData, setCentreData] = useState(null);
    const [cName, setcName] = useState("");
    const [cEmail, setcEmail] = useState("");
    const [contact, setContact] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [street, setStreet] = useState("");
    const [door, setDoor] = useState("");

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const fetchCentreData = async () => {
            try {
                const response = await axios.get(`/showOne/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                setCentreData(response.data);
                setcEmail(response.data.cEmail);
                setcName(response.data.cName);
                setContact(response.data.contact);
                setDoor(response.data.address.doorNo);
                setStreet(response.data.address.street);
                setCountry(response.data.address.country);
                setState(response.data.address.state);
                setCity(response.data.address.city);
                setPostalCode(response.data.address.postalCode);
            } catch (error) {
                console.error("Error fetching centre data:", error);
            }
        };

        fetchCentreData();
    }, [id]);

    useEffect(() => {
        if (country) {
            const statesData = State.getStatesOfCountry(country);
            setStates(statesData);
        } else {
            setStates([]);
            setState("");
        }
    }, [country]);

    useEffect(() => {
        if (state) {
            const citiesData = City.getCitiesOfState(country, state);
            setCities(citiesData);
        } else {
            setCities([]);
            setCity("");
        }
    }, [state, country]);

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
        setState("");
        setCity("");
    };

    const handleStateChange = (event) => {
        setState(event.target.value);
        setCity("");
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const updatedData = {
            cName,
            cEmail,
            contact,
            address: {
                doorNo: door,
                street,
                country,
                state,
                city,
                postalCode,
            },
        };

        try {
            const response = await axios.put(`/update/${id}`, updatedData, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            dispatch({ type: "CENTREPROFILE", payload: { centre: response.data } });
            navigate("/dashboard");
        } catch (error) {
            console.error("Error updating centre data:", error);
        }

        const updatedCentreResponse = await axios.get("/showAll", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });

        dispatch({ type: "CENTREPROFILE", payload: { centre: updatedCentreResponse.data } });
        navigate("/dashboard");
    };

    if (!centreData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Edit Centre Profile</h2>
            <form onSubmit={handleSave}>
                <label>Centre Name:</label>
                <input
                    type="text"
                    value={cName}
                    onChange={e => setcName(e.target.value)}
                />
                <br />
                <br />
                <label>Centre Email:</label>
                <input
                    type="text"
                    value={cEmail}
                    onChange={e => setcEmail(e.target.value)}
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
                <input
                    type="text"
                    value={door}
                    onChange={e => setDoor(e.target.value)}
                    placeholder="Enter door no."
                />
                <br />
                <br />
                <input
                    type="text"
                    value={street}
                    onChange={e => setStreet(e.target.value)}
                    placeholder="Enter street name"
                />
                <br />
                <br />
                <select value={country} onChange={handleCountryChange}>
                    <option value="">Select Country</option>
                    {Country.getAllCountries().map((country) => (
                        <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                    ))}
                </select>
                <br />
                <br />
                <select value={state} onChange={handleStateChange}>
                    <option value="">Select State</option>
                    {states.map((state) => (
                        <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
                    ))}
                </select>
                <br />
                <br />
                <select value={city} onChange={handleCityChange}>
                    <option value="">Select City</option>
                    {cities.map((city) => (
                        <option key={city.isoCode} value={city.isoCode}>{city.name}</option>
                    ))}
                </select>
                <br />
                <br />
                <input
                    type="text"
                    value={postalCode}
                    onChange={e => setPostalCode(e.target.value)}
                    placeholder="Enter postal code"
                />
                <br />
                <br />
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

