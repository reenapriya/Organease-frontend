import { useEffect } from "react"
import axios from "../config/axios"
import { useParams ,Link} from "react-router-dom"
import { useAuth } from "../context/UserContext"
export default function MyCentre(){
    
    const {dispatch,centre,categories,organ}=useAuth()
  

    useEffect(()=>{
        (async()=>{

        const response =await axios.get(`/cateMyShow`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        console.log("response",response.data)
        dispatch({ type: "CATEGORY", payload: { categories: response.data } });

        })

       ()
    },[])

    return (
        <div>
            <h1>My Centre</h1>
            <ul>
                {categories.map((ele)=>{
                    return <li key={ele._id} ><Link to ={ `/organShow/category/${ele._id}`}>{ele.catName}</Link></li>
                    
                })}
            </ul>
        </div>
    )
}