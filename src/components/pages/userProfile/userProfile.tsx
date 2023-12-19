import React, { useEffect, useState } from 'react';

import { Card } from 'flowbite-react';
import { useParams } from 'react-router-dom';
const UserProfile = () => {
  const [data, setData] = useState<any>([]);
  const params = useParams();
  const [updatedData, setupdatedData] = useState([]);
  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserDetail = async () => {
    try {
      const id = params.id;
      const response = await fetch(`https://fakestoreapi.com/users/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((json) => {
          setData([json]);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="flex flex-col items-center justify-center px-6 py-8  md:h-screen lg:py-0">
      <Card className="max-w-sm">
        <div className="flex flex-col items-center pb-10">
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Profile User
          </h5>
          <div>
            {data.map((item: any) => (
              <ul key={item.id}>
                <span>Personal Info</span>
                <li>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Username :
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {item.username}
                  </span>
                </li>
                <li>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Password
                  </span>{' '}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {item.password}
                  </span>
                </li>
                <li>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    First Name :
                  </span>{' '}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {item.name?.firstname}
                  </span>
                </li>
                <li>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Last Name :
                  </span>{' '}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {item.name?.lastname}
                  </span>
                </li>
                <li>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Phone :
                  </span>{' '}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {item.phone}
                  </span>
                </li>
                <span>Address</span>
                <li>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    City:
                  </span>{' '}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {item.address.city}
                  </span>
                </li>{' '}
                <li>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Geolocation :
                  </span>{' '}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    lat : {item.address.geolocation.lat} long :
                    {item.address.geolocation.long}
                  </span>
                </li>
                <li>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Number :
                  </span>{' '}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {item.address.number}
                  </span>
                </li>
                <li>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Street :
                  </span>{' '}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {item.address.street}
                  </span>
                </li>
                <li>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Zipcode :
                  </span>{' '}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {item.address.zipcode}
                  </span>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
};

export default UserProfile;
