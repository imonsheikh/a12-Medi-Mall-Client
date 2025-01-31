import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext)
    const { data: carts = [], refetch } = useQuery({
      queryKey: ["carts", user?.email],
      queryFn: async () => {
        const res = await axiosSecure.get(`/carts?email=${user?.email}`);
        return res.data;
      },
      
    });
    return [carts, refetch]
};

export default useCart;
