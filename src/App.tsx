import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainLayouts from './components/layout/mainLayout';
import Login from './components/pages/login/login';
import User from './components/pages/user/user';
import UserProfile from './components/pages/userProfile/userProfile';
import AddUser from './components/pages/addUser/addUser';
function App() {
  return (
    <>
      <MainLayouts>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/User"
            element={
              <>
                <User />
              </>
            }
          />
          <Route
            path="/userprofile/:id"
            element={
              <>
                <UserProfile />
              </>
            }
          />
          <Route
            path="/adduser/:id"
            element={
              <>
                <AddUser />
              </>
            }
          />
        </Routes>
      </MainLayouts>
    </>
  );
}

export default App;
