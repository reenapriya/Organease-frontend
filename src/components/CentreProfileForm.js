
import axios from "../config/axios";
import { useState, useEffect } from "react";
import { useAuth } from "../context/UserContext";
import { Country, State, City } from 'country-state-city';
import { useNavigate } from "react-router-dom";

export default function CentreProfileForm() {
  const { user, dispatch } = useAuth();
  const navigate = useNavigate();
  const [contact, setContact] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");
  const [door, setDoor] = useState("");
  const [serverErrors, setServerErrors] = useState(null);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [license, setLicense] = useState(null);

  useEffect(() => {
    const countriesData = Country.getAllCountries();
    setCountries(countriesData);
  }, []);

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
  }, [state]);

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

  const handleFileChange = (e) => {
    setLicense(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const centreFormData = new FormData();
    centreFormData.append("contact", contact);
    centreFormData.append("address[doorNo]", door);
    centreFormData.append("address[street]", street);
    centreFormData.append("address[country]", country);
    centreFormData.append("address[state]", state);
    centreFormData.append("address[city]", city);
    centreFormData.append("address[postalCode]", postalCode);
    centreFormData.append("license", license);

    try {
      const response = await axios.post("/register", centreFormData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data"
        }
      });
      console.log("centreProfile", response.data);

      // Fetch the updated data and update the context
      const updatedCentreResponse = await axios.get("/showAll", {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });

      dispatch({ type: "CENTREPROFILE", payload: { centre: updatedCentreResponse.data } });
      navigate("/dashboard");
    } catch (error) {
      console.error(error); // Log error message to console
      setServerErrors(error.response?.data?.errors || ["An unexpected error occurred."]);
    }
  };

  return (
    <div>
      <h2>Centre Profile Form</h2>
      {serverErrors && (
        <div>
          <h2>These are server errors</h2>
          <ul>
            {serverErrors.map((error, index) => (
              <li key={index}>{error.msg}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>Contact:</label>
        <input
          type="text"
          onChange={e => setContact(e.target.value)}
          value={contact}
        />
        <br />
        <br />
        <input
          type="text"
          onChange={e => setDoor(e.target.value)}
          value={door}
          placeholder="Enter door no."
        />
        <br />
        <br />
        <input
          type="text"
          onChange={e => setStreet(e.target.value)}
          value={street}
          placeholder="Enter street name"
        />
        <br />
        <br />
        <select value={country} onChange={handleCountryChange}>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
          ))}
        </select>
        <select value={state} onChange={handleStateChange}>
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
          ))}
        </select>
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
          onChange={e => setPostalCode(e.target.value)}
          value={postalCode}
          placeholder="Enter postal code."
        />
        <br />
        <br />

        <label>Provide Centre License:</label>
        <input
          type="file"
          name="license"
          onChange={handleFileChange}
        />
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

