import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUsersLoad = () => {
    const axiosSecure = useAxiosSecure()
    const {data: users=[], refetch} = useQuery({
        queryKey: ["users"],
        queryFn:  async()=> {
            const res = await axiosSecure.get("/users",{
                headers:{
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            })
            return res.data
        }
    })
    return [users, refetch]
};

export default useUsersLoad;