import { useEffect } from "react";
import axios from "../config/axios"
import { useNavigate } from "react-router-dom";
import paymentSuccessful from "../Assests/payment-successful.png"


export default function Success(){
    const navigate=useNavigate()
    useEffect(()=>{
        (async()=>{

            try{
                const stripeId=localStorage.getItem("stripeId")
    
                const payment=await axios.put(`/payment/success/${stripeId}`,{paymentStatus:"successfully"})

            }
            catch(e){
                console.log(e)
            }

        })
        ()

    },[])

    return (
        <div>
          <img src={paymentSuccessful} alt={paymentSuccessful} width="300" height='300' style={{marginLeft:'215px'}}/>
        </div>
    )

}