import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider'; // Check the path to AuthProvider
import useAxiosSecure from './useAxiosSecure'; // Check the path to useAxiosSecure

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: [user?.email, 'isAdmin'],
    queryFn: async () => {
      if (!user) {
        return false;
      }
      try {
        const res = await axiosSecure.get(`/users/admin/${user.email}`);
        return res.data?.admin || false;
      } catch (error) {
        throw new Error('Failed to fetch admin status');
      }
    },
    enabled: !loading && !!user?.email,
  });

  if (!user) {
    return [false, true]; // Return default values when user is not defined
  }

  if (isAdminLoading) {
    return [false, true]; // Return loading state
  }

  if (isAdmin === undefined) {
    return [false, false]; // Handle cases where isAdmin is undefined
  }

  return [isAdmin, false]; // Return isAdmin and loading state
};

export default useAdmin;
