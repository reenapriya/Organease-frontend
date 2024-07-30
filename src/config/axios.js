// import axios from "axios"
// export default axios.create({
//     baseURL:"http://localhost:3000"
// })
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:2525' // Ensure this matches the backend server port
});

export default instance;
