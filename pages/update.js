import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

export default function Update() {
  const [rank, setRank] = useState('');
  const [first_name, setName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone_number, setPhone] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${id}`);
      const user = response.data;
      setRank(user.rank);
      setName(user.first_name);
      setLastName(user.last_name);
      setPhone(user.phone_number);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      rank,
      first_name,
      last_name,
      phone_number,
    };

    try {
      const response = await axios.put(`http://localhost:3000/api/users/${id}`, updatedUser);
      console.log('User updated successfully:', response.data);

      Swal.fire({
        icon: 'success',
        title: 'User Updated',
        text: 'The user has been updated successfully.',
      }).then(() => {
        // Redirect to home page after updating the user
        router.push('/');
      });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-4xl font-bold my-4">Update User</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="rank" className="block text-gray-700 font-bold mb-2">
            Rank:
          </label>
          <input
            type="text"
            id="rank"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="first_name" className="block text-gray-700 font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="first_name"
            value={first_name}
            onChange={(e) => setName(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="last_name" className="block text-gray-700 font-bold mb-2">
            Last Name:
          </label>
          <input
            type="text"
            id="last_name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone_number" className="block text-gray-700 font-bold mb-2">
            Phone:
          </label>
          <input
            type="text"
            id="phone_number"
            value={phone_number}
            onChange={(e) => setPhone(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update User
        </button>
      </form>
    </div>
  );
}
