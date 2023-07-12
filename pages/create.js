import { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

export default function Create() {
    const [rank, setRank] = useState('');
    const [first_name, setName] = useState('');
    const [last_name, setLastName] = useState('');
    const [phone_number, setPhone] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            rank,
            first_name,
            last_name,
            phone_number,
        };

        try {
            const response = await axios.post('http://localhost:3000/api/users', newUser);
            console.log('User added successfully:', response.data);

            Swal.fire({
                icon: 'success',
                title: 'User Added',
                text: 'The user has been added successfully.',
            }).then(() => {
                setRank('')
                setName('')
                setLastName('')
                setPhone('')
                // Redirect to home page after adding the user
                router.push('/create');
            });
        } catch (error) {
            console.error('Error adding user:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while adding the user.',
            });
        }
    };

    return (
        <div>
            <Navbar />
            <h1 className="text-4xl font-bold my-4">Create User</h1>
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
                    Add User
                </button>
            </form>
        </div>
    );
}
