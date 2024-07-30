import { useAuth } from "../context/UserContext"
import axios from "../config/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function HospitalProfile(){
    const {user,dispatch}=useAuth()
    const [authCertificate,setauthCertificate]=useState("")
    const [place,setPlace]=useState("")
    const [contact,setContact]=useState("")
    const [serverErrors,setServerErrors]=useState(null)
    const navigate=useNavigate()


    const handleSubmit=async(e)=>{
        e.preventDefault()
        const formData={
             place,
             contact,
            authCertificate
        }
        try{
            const hospitalResponse=await axios.post("/hospitaldetails",formData,{
                headers: {
                    Authorization: localStorage.getItem("token")
                  }
            })
           console.log("hospitalResponse",hospitalResponse)

          //  const hid=hospitalResponse.data._id
          //   console.log("iii",hid)
           const updatedHospitalResponse = await axios.get(`/hospitalShow`, {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          });
    
          dispatch({ type: "HOSPITALPROFILE", payload: { hospital: updatedHospitalResponse.data } });
          navigate("/dashboard");
        }
      catch(error){
        
        console.error(error); // Log error message to console
        setServerErrors(error.response?.data?.errors || ["An unexpected error occurred."]);
      }
      
    }
    return (
        <div>
            <h2>Hospital  Profile  Details </h2>
             
             <h3>kindly Fill this details pls!!!</h3>

               

             {serverErrors && (
        <div>
          <h2>These are server errors</h2>
          <ul>
            {serverErrors.map((errors, index) => (
              <li key={index}>{errors.msg}</li>
            ))}
          </ul>
        </div>
      )}

             <form onSubmit={handleSubmit}>

               <label>Enter a place</label>
               <input type="text"
                    onChange={e=>{setPlace(e.target.value)}}
                    name="place"
                    value={place}/>
                  <br/>
                  <br/>

                  <label>Contact No:</label>
               <input type="text"
                    onChange={e=>{setContact(e.target.value)}}
                    name="contact"
                    value={contact}/>
                  <br/>
                  <br/>

                <label>Provide Approved Hospital Certificate xerox here</label>
                <input type="text"
                  onChange={e=>{setauthCertificate(e.target.value)}}
                  name="authCertificate"
                  value={authCertificate}/>
                  <br/>
                
                <input type="submit"/>

             </form>
        </div>
    )
}