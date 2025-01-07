import axios from "axios";

const connection = axios.create({
    baseURL: "https://api.escuelajs.co/api/v1"
})

export default connection;