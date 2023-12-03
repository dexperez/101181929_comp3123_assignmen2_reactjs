import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/addEmployee.css';

const AddEmployeeComponent = () => {
  const navigation = useNavigate();

  const [employeeData, setEmployeeData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    gender: '',
    salary: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/emp/employee', employeeData);
      console.log('API Response:', response.data);
      navigation('/employeeList');
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleApiError = (error) => {
    console.error('Error while adding a new employee:', error);

    if (error.response) {
      console.error('Server response data:', error.response.data);
      console.error('Server response status:', error.response.status);
      console.error('Server response headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received from the server');
    } else {
      console.error('Error message:', error.message);
    }
  };

  return (
    <div className='add-employee-container'>
      <h1>Add Employee</h1>
      <form onSubmit={handleAddEmployee}>
        <br />
        <div className='form-group'>
          <input className='form-input' type="text" id="first_name" placeholder="First Name" onChange={handleInputChange} />
        </div>
        <div className='form-group'>
          <input className='form-input' type="text" id="last_name" placeholder="Last Name" onChange={handleInputChange} />
        </div>
        <div className='form-group'>
          <input className='form-input' type="text" id="email" placeholder="Email" onChange={handleInputChange} />
        </div>
        <div className='form-group'>
          <input className='form-input' type="text" id="gender" placeholder="Gender" onChange={handleInputChange} />
        </div>
        <div className='form-group'>
          <input className='form-input' type="text" id="salary" placeholder="Salary" onChange={handleInputChange} />
        </div>
        <div className='form-group'>
          <button className='save-btn' type='submit'>Save</button>
          <Link to='/employeeList'>
            <button className='cancel-btn'>Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeeComponent;
