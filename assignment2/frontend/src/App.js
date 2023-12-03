import './App.css';
import Navbar from './components/nav/nav.js';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import { render } from "react-dom";
import { Link, BrowserRouter as Router, Switch, Route, RouterProvider, Routes } from "react-router-dom";
import EmployeeList from './components/employee/listEmployee.js';
import AddEmployee from './components/employee/addEmployee.js';
import UpdateEmployee from './components/employee/updateEmployee.js';
import ViewEmployee from './components/employee/viewEmployee.js';
import React, { useState } from 'react';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <Router>
      <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
      <Routes>        
        {loggedInUser ? (
            <>
              <Route path='/employeeList' element={<EmployeeList setLoggedInUser={setLoggedInUser}/>} />
              <Route path="/addEmployee" element={<AddEmployee />} />
              <Route path="/updateEmployee/:_id" element={<UpdateEmployee />} />
              <Route path="/viewEmployee/:_id" element={<ViewEmployee />} />
            </>
        ) : (
          <>
            <Route path='/signup' element={<Signup />}/>
            <Route path='/login' element={<Login setLoggedInUser={setLoggedInUser}/>}/>
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
