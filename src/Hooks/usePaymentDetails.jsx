import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const usePaymentDetails = () => {
    const axiosSecure = useAxiosSecure();
    const { data: payments = [], refetch } = useQuery({
        queryKey: ["payments"],
        queryFn: async () => {
            const res = await axiosSecure.get("/payment-history");
            return res.data;
        }
    });
    return [payments, refetch];
};

export default usePaymentDetails;
