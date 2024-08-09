import { useEffect } from "react";
import axios from "../config/axios"
import { useNavigate } from "react-router-dom";
import declined from "../Assests/declined.png"


export default function Success(){
    const navigate=useNavigate()
    useEffect(()=>{
        (async()=>{

            try{
                const stripeId=localStorage.getItem("stripeId")
                const payment=await axios.put(`/payment/failed/${stripeId}`,{paymentStatus:"failed"})

            }
            catch(e){
                console.log(e)
            }

        })
        ()

    },[])

    return (
        <div>
          <img src={declined} alt={declined} width="300" height='300' style={{marginLeft:'215px'}}/>
        </div>
    )

}