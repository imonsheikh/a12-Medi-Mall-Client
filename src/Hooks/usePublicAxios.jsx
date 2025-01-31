import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://medi-mall-server.vercel.app'
})

const usePublicAxios = () => {
    return (
        axiosPublic
    );
};

export default usePublicAxios;