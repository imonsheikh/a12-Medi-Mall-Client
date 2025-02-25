import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://a12-medi-mall-server.vercel.app'
})

const usePublicAxios = () => {
    return (
        axiosPublic
    );
};

export default usePublicAxios;