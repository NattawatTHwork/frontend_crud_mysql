import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

export default function Home() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (id) => {
    console.log('Edit user with ID:', id);
    router.push({
      pathname: '/update',
      query: { id: id },
    });
  };

  const handleDelete = async (id) => {
    console.log('Delete user with ID:', id);

    // แสดงกล่องข้อความยืนยันก่อนลบ
    Swal.fire({
      icon: 'warning',
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete this user?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/api/users/${id}`);
          console.log('User deleted successfully');
          fetchUsers();
          Swal.fire({
            icon: 'success',
            title: 'User Deleted',
            text: 'The user has been deleted successfully.',
          });
        } catch (error) {
          console.error('Error deleting user:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while deleting the user.',
          });
        }
      }
    });
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-4xl font-bold my-4">User List</h1>
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="py-3 px-6 bg-gray-100 text-gray-600">ID</th>
            <th className="py-3 px-6 bg-gray-100 text-gray-600">Rank</th>
            <th className="py-3 px-6 bg-gray-100 text-gray-600">Name</th>
            <th className="py-3 px-6 bg-gray-100 text-gray-600">Last Name</th>
            <th className="py-3 px-6 bg-gray-100 text-gray-600">Phone</th>
            <th className="py-3 px-6 bg-gray-100 text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100 text-center">
              <td className="py-4 px-6">{user.id}</td>
              <td className="py-4 px-6">{user.rank}</td>
              <td className="py-4 px-6">{user.first_name}</td>
              <td className="py-4 px-6">{user.last_name}</td>
              <td className="py-4 px-6">{user.phone_number}</td>
              <td className="py-4 px-6">
                <button onClick={() => handleEdit(user.id)} className="mr-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(user.id)} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
