import axios from 'axios';

const axiosServer = axios.create({
    baseURL: process.env.React_App_Server_Host
});

export default axiosServer;