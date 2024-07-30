
import React, { useState } from 'react';
import axios from '../config/axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function ShowCentre() {
  
    const [organName, setOrganName] = useState('');
    const [organs, setOrgans] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleClick = (cid) => {
        navigate(`/showOne/${cid}`);
        console.log("cid",cid)
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.get(`/search?organ=${organName}`, 
            
            )
            console.log("response", response.data);
            setOrgans(response.data);
        } catch (err) {
            setError('An error occurred while fetching data.');
        }
    }

    const  handleRequest=(id,oid)=>{
    
        navigate(`/request/${oid}/${id}`)

    }

    return (
        <div>
            <h3>Search here what organ do you need</h3>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Enter organ name"
                    value={organName}
                    onChange={(e) => setOrganName(e.target.value)}
                />
                <br />
                <br />
                <button type="submit">Search</button>
            </form>

            {error && <p>{error}</p>}

            {organs.length > 0 && (
                <>
                    <h3>Donor Details</h3>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>DonorName</th>
                                <th>DonorAge</th>
                                <th>DonorWeight</th>
                                <th>BloodType</th>
                                <th>Status</th>
                                <th>secretCode</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {organs.map((organ) => (
                                <tr key={organ._id}>
                                    <td>{organ.dName}</td>
                                    <td>{organ.dAge}</td>
                                    <td>{organ.dWeight}</td>
                                    <td>{organ.bloodType}</td>
                                    <td>{organ.status}</td>
                                    <td>{organ.secretCode}</td>
                                    <td>
                                        <button onClick={() => handleClick(organ.cid)}>Centre Name</button>
                                        <button onClick={() => handleRequest(organ._id,organ.oid)}>Request</button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
           
        </div>
    );
}
