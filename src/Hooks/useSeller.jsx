import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAxiosSecure from './useAxiosSecure';

const useSeller = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: isSeller, isLoading: isSellerLoading } = useQuery({
    queryKey: [user?.email, 'isSeller'],
    queryFn: async () => {
      if (!user) {
        return false;
      }
      try {
        const res = await axiosSecure.get(`/users/seller/${user.email}`);
        return res.data?.seller || false;
      } catch (error) {
        throw new Error('Failed to fetch seller status');
      }
    },
    enabled: !loading && !!user?.email,
  });

  if (!user) {
    return [false, true]; // Return default values when user is not defined
  }

  if (isSellerLoading) {
    return [false, true]; // Return loading state
  }

  if (isSeller === undefined) {
    return [false, false]; // Handle cases where isSeller is undefined
  }

  return [isSeller, false];
};

export default useSeller;
