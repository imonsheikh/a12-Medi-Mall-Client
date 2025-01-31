import toast from 'react-hot-toast';
import UseAdvice from '../../../../Hooks/UseAdvice';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const ManageAdvice = () => {
    const axiosSecure = useAxiosSecure();
    const [advices, refetch] = UseAdvice();

    const addSlide = async (id) => {
        try {
            const response = await axiosSecure.patch(`/advice/${id}`, { status: 'accept' });
            if (response.data.modifiedCount > 0) {
                toast.success('Advice accepted');
                refetch();
            }
        } catch (error) {
            toast.error('Failed to update status');
            console.error('Error updating status:', error);
        }
    }

    const removeSlide = async (id) => {
        try {
            const response = await axiosSecure.patch(`/advice/${id}`, { status: 'pending' });
            if (response.data.modifiedCount > 0) {
                toast.success('Advice removed from slide');
                refetch();
            }
        } catch (error) {
            toast.error('Failed to update status');
            console.error('Error updating status:', error);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Helmet><title>Manage Advice</title></Helmet>
            <div className="text-center py-7 lg:py-14">
                <h1 className=" text-3xl lg:text-5xl">Manage Advertisements</h1>
            </div>
            <div className="mx-auto p-8 max-w-[1200px] mt-10 bg-white">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className="bg-custom-custom text-white">
                                <th className=" text-sm lg:text-xl">Medicine Image</th>
                                <th className=" text-sm lg:text-xl">Medicine Name</th>
                                <th className=" text-sm lg:text-xl">Description</th>
                                <th className=" text-sm lg:text-xl">Seller Email</th>
                                <th className=" text-sm lg:text-xl">Status</th>
                                <th className="text-center  text-sm lg:text-xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {advices.map((advice) => (
                                <tr key={advice._id}>
                                    <td><img src={advice.adviceImage} alt={advice.name} className="w-20 h-20 object-cover" /></td>
                                    <td>{advice.title.slice(0, 15)}</td>
                                    <td>{advice.details.slice(0, 40)}....</td>
                                    <td>{advice.sellerEmail}</td>
                                    <td>{advice.status}</td>
                                    <td className="flex justify-center space-x-4">
                                        {
                                            advice.status === 'accept' ?
                                                <button onClick={() => removeSlide(advice._id)} className=' text-sm lg:text-base btn bg-red-300'>
                                                    REMOVE SLIDE
                                                </button> :
                                                <button onClick={() => addSlide(advice._id)} className=' text-sm lg:text-base btn bg-green-300'>
                                                    ADD SLIDE
                                                </button>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageAdvice;
