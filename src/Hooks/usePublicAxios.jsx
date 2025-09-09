import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://a12-medi-mall-server.vercel.app'
    // baseURL: 'http://localhost:5000'
})

const usePublicAxios = () => {
    return (
        axiosPublic
    );
};

export default usePublicAxios;

