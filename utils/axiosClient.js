
import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://b60upcmqnc.execute-api.ap-south-1.amazonaws.com/prod/abhay",
    headers: {
        "Content-Type": "application/json",
    },
});



export default axiosClient;