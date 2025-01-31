import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useUsersLoad from "../../../../Hooks/useUsersLoad";
import { Helmet } from "react-helmet-async";

const ManageUser = () => {
  const [users, refetch ] = useUsersLoad();
  const axiosSecure = useAxiosSecure()

  const handleRoleChange = (user, newRole) => {
    Swal.fire({
      title: `Ready to make ${newRole.charAt(0).toUpperCase() + newRole.slice(1)}`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, make ${newRole}`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}`, { role: newRole })
          .then(() => {
            refetch(); // Refetch users data to update UI
            Swal.fire({
              title: "Successful",
              text: `User moved to ${newRole} successfully`,
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error updating user role:", error);
            Swal.fire({
              title: "Error",
              text: "Failed to update user role",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>
          Manage User
        </title>
      </Helmet>
      <div className="text-center py-7 lg:py-14">
        <h1 className=" text-3xl lg:text-5xl">Manage All Users</h1>
      </div>
      <div className="mx-auto p-8 max-w-[1200px] mt-16 bg-white">
        <h1 className=" text-xl lg:text-3xl mb-6">{`Total Users: ${users.length}`}</h1>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="bg-custom-custom text-white">
                <th className="text-base lg:text-xl">Name</th>
                <th className="text-base lg:text-xl">Email</th>
                <th className="text-base lg:text-xl">Role</th>
                <th className="text-center text-base lg:text-xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <h1 className="text-sm lg:text-lg">{user.name}</h1>
                  </td>
                  <td>
                    <h2 className="text-sm lg:text-lg">{user.email}</h2>
                  </td>
                  <td>
                    <h2 className="text-sm lg:text-lg">{user.role}</h2>
                  </td>
                  <td className="flex justify-center space-x-4">
                    {user.role === "user" && (
                      <>
                        <button
                          onClick={() => handleRoleChange(user, "admin")}
                          className="btn lg:px-4 lg:py-2 bg-emerald-300 text-white hover:bg-emerald-400"
                        >
                          Make Admin
                        </button>
                        <button
                          onClick={() => handleRoleChange(user, "seller")}
                          className="btn lg:px-4 lg:py-2 bg-orange-300 text-white hover:bg-orange-400"
                        >
                          Make Seller
                        </button>
                      </>
                    )}
                    {user.role === "seller" && (
                      <button
                        onClick={() => handleRoleChange(user, "user")}
                        className="btn px-4 py-2 bg-blue-300 text-white hover:bg-blue-400"
                      >
                        Make User
                      </button>
                    )}
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

export default ManageUser;
