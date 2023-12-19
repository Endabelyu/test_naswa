import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Pagination } from 'flowbite-react';

const User = () => {
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => setCurrentPage(page);
  const [updatedData, setupdatedData] = useState([]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json());
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = (id: string, event: React.MouseEvent<HTMLElement>) => {
    try {
      const response = fetch(`https://fakestoreapi.com/users/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json());

      const indexToDelete = data.findIndex((item: any) => item.id === id);

      if (indexToDelete !== -1) {
        const updatedData = [...data];
        updatedData.splice(indexToDelete, 1);
        setData(updatedData);
      }
      toast.success('Delete User Success !', {
        position: toast.POSITION.TOP_CENTER,
      });
      getUser();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <ToastContainer />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  First Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete User
                </th>
                <th scope="col" className="px-6 py-3">
                  Go to Edit & Add User Page
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any) => (
                <tr
                  key={item.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.username}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.name?.firstname}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.name?.lastname}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.phone}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/userprofile/${item.id}`}
                      className="font-medium text-blue-600 cursor-pointer dark:text-blue-500 hover:underline"
                    >
                      Detail
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <p
                      onClick={(event) => deleteUser(item.id, event)}
                      className="font-medium text-blue-600 cursor-pointer dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/adduser/${item.id}`}
                      className="font-medium text-blue-600 cursor-pointer dark:text-blue-500 hover:underline"
                    >
                      Go to Add User Page
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};

export default User;
