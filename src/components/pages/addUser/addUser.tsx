import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ModalBody, Pagination } from 'flowbite-react';
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
// import { useParams } from 'react-router-dom';
const AddUser = () => {
  const [data, setData] = useState<any>([]);
  const [dataDetail, setDataDetail] = useState<any>([]);

  // state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => setCurrentPage(page);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // state for open modal add or edit
  const [addModal, setAddModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // state for edit or add data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [phone, setPhone] = useState('');

  const [updatedData, setupdatedData] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  let payload: any = {
    email: email,
    username: username,
    password: password,
    name: {
      firstname: firstname,
      lastname: lastname,
    },
    address: {
      city: city,
      street: street,
      number: number,
      zipcode: zipcode,
      geolocation: {
        lat: lat,
        long: long,
      },
    },
    phone: phone,
  };
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
  const editUser = (id: string, e: React.FormEvent) => {
    try {
      fetch(`https://fakestoreapi.com/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).then((res) => res.json());

      // const indexToDelete = data.findIndex((item: any) => item.id === id);

      // if (indexToDelete !== -1) {
      //   const updatedData = [...data];
      //   updatedData.splice(indexToDelete, 1);
      //   setData(updatedData);
      // }
      toast.success('Edit User Success !', {
        position: toast.POSITION.TOP_CENTER,
      });
      // getUser();
      payload = {};
    } catch (error) {
      console.log(error);
    }
  };

  const getUserDetail = async (
    id: string,
    event: React.MouseEvent<HTMLElement>
  ) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/users/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((json) => {
          setDataDetail([json]);
          console.log(dataDetail);
        });
    } catch (error) {
      console.log(error);
    }
  };
  // function to add new user
  const addUser = (event: React.MouseEvent<HTMLElement>) => {
    try {
      fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).then((res) => res.json());
      toast.success('Add User Success !', {
        position: toast.POSITION.TOP_CENTER,
      });
      let updatedData = data;
      // make data updated locally because no any database
      updatedData.push(payload);
      setData([]);
      setData(updatedData);
      payload = {};
    } catch (error) {
      console.log(error);
    }
  };

  const onCloseModal = () => {
    setOpenModal(false);
    setAddModal(false);
    payload = {};
  };

  return (
    <>
      <div>
        <ToastContainer />
        <div className="w-full my-5">
          <Button
            className=""
            onClick={() => {
              setOpenModal(true);
              setAddModal(true);
            }}
          >
            Add New User
          </Button>
        </div>
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
                    <p
                      onClick={(event) => {
                        setOpenModal(true);
                        getUserDetail(item.id, event);
                      }}
                      className="font-medium text-blue-600 cursor-pointer dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </p>
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

      <Modal show={openModal} size="xl" onClose={onCloseModal} popup>
        <Modal.Header />
        {/* logical when add user or edit user clicked */}
        {openModal && addModal ? (
          <ModalBody>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Add New User
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Your Email" />
                </div>
                <TextInput
                  id="email"
                  placeholder="john123"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="Username" value="Your Username" />
                </div>
                <TextInput
                  id="username"
                  type="text"
                  placeholder="john123"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Your password" />
                </div>
                <TextInput
                  onChange={(event) => setPassword(event.target.value)}
                  id="password"
                  type="password"
                  value={password}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="firstname" value="Your firstname" />
                </div>
                <TextInput
                  onChange={(event) => setFirstname(event.target.value)}
                  id="firstname"
                  type="text"
                  value={firstname}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="lastname" value="Your lastname" />
                </div>
                <TextInput
                  onChange={(event) => setLastname(event.target.value)}
                  id="lastname"
                  type="text"
                  value={lastname}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="city" value=" city" />
                </div>
                <TextInput
                  onChange={(event) => setCity(event.target.value)}
                  id="city"
                  type="text"
                  value={city}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="street" value="Your street" />
                </div>
                <TextInput
                  onChange={(event) => setStreet(event.target.value)}
                  id="street"
                  type="text"
                  value={street}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="number" value="Your number" />
                </div>
                <TextInput
                  onChange={(event) => setNumber(event.target.value)}
                  id="number"
                  type="text"
                  value={number}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="zipcode" value="Your zipcode" />
                </div>
                <TextInput
                  onChange={(event) => setZipcode(event.target.value)}
                  id="zipcode"
                  type="text"
                  value={zipcode}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="latitude" value="Your latitude" />
                </div>
                <TextInput
                  onChange={(event) => setLat(event.target.value)}
                  id="latitude"
                  type="latitude"
                  value={lat}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="Longitude" value="Your Longitude" />
                </div>
                <TextInput
                  onChange={(event) => setLong(event.target.value)}
                  id="Longitude"
                  type="Longitude"
                  value={long}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="Phone" value="Your Phone" />
                </div>
                <TextInput
                  onChange={(event) => setPhone(event.target.value)}
                  id="Phone"
                  type="text"
                  value={phone}
                  required
                />
              </div>
              <div className="w-full">
                <Button onClick={(event) => addUser(event)}>
                  Add New User
                </Button>
              </div>
            </div>
          </ModalBody>
        ) : (
          <Modal.Body>
            {dataDetail.map((item: any) => (
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Edit Profile User
                </h3>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email" value="Your Email" />
                  </div>
                  <TextInput
                    id="email"
                    placeholder="john123"
                    type="email"
                    value={item.email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="Username" value="Your Username" />
                  </div>
                  <TextInput
                    id="username"
                    type="text"
                    placeholder="john123"
                    defaultValue={item.username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="password" value="Your password" />
                  </div>
                  <TextInput
                    onChange={(event) => setPassword(event.target.value)}
                    id="password"
                    type="password"
                    defaultValue={item.password}
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="firstname" value="Your firstname" />
                  </div>
                  <TextInput
                    onChange={(event) => setFirstname(event.target.value)}
                    id="firstname"
                    type="text"
                    defaultValue={item.name.firstname}
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="lastname" value="Your lastname" />
                  </div>
                  <TextInput
                    onChange={(event) => setLastname(event.target.value)}
                    id="lastname"
                    type="text"
                    defaultValue={item.name.lastname}
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="city" value=" city" />
                  </div>
                  <TextInput
                    onChange={(event) => setCity(event.target.value)}
                    id="city"
                    type="text"
                    defaultValue={item.address.city}
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="street" value="Your street" />
                  </div>
                  <TextInput
                    onChange={(event) => setStreet(event.target.value)}
                    id="street"
                    type="text"
                    defaultValue={item.address.street}
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="number" value="Your number" />
                  </div>
                  <TextInput
                    onChange={(event) => setNumber(event.target.value)}
                    id="number"
                    type="text"
                    defaultValue={item.address.number}
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="zipcode" value="Your zipcode" />
                  </div>
                  <TextInput
                    onChange={(event) => setZipcode(event.target.value)}
                    id="zipcode"
                    type="text"
                    defaultValue={item.address.zipcode}
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="latitude" value="Your latitude" />
                  </div>
                  <TextInput
                    onChange={(event) => setLat(event.target.value)}
                    id="latitude"
                    type="latitude"
                    defaultValue={item.address.geolocation.lat}
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="Longitude" value="Your Longitude" />
                  </div>
                  <TextInput
                    onChange={(event) => setLong(event.target.value)}
                    id="Longitude"
                    type="Longitude"
                    defaultValue={item.address.geolocation.long}
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="Phone" value="Your Phone" />
                  </div>
                  <TextInput
                    onChange={(event) => setPhone(event.target.value)}
                    id="Phone"
                    type="text"
                    defaultValue={item.phone}
                    required
                  />
                </div>
                <div className="w-full">
                  {/* (event)=>editUser(item.id, event) */}
                  <Button onClick={(event) => editUser(item.id, event)}>
                    Edit User
                  </Button>
                </div>
              </div>
            ))}
          </Modal.Body>
        )}
      </Modal>
    </>
  );
};

export default AddUser;
