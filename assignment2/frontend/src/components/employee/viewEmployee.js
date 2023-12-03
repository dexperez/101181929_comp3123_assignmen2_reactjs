import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './css/viewEmployee.css';

const ViewEmployee = () => {
  const { _id } = useParams();
  const [employee, setEmployee] = useState({
    _id: ' ',
    first_name: '',
    last_name: '',
    email: '',
    gender: ' ',
    salary: '',
  });

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/emp/employee/${_id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee data by ID: " + error);
      }
    };

    fetchEmployeeData();
  }, [_id]);

  return (
    <div className='empDetails-container'>
      <h2>View Employee Details</h2>
      <div className="emp-details">
        <p>Employee ID: {employee._id}</p>
        <p>Employee Name: {employee.first_name} {employee.last_name}</p>
        <p>Employee Email: {employee.email}</p>
        <p>Employee Gender: {employee.gender}</p>
        <p>Employee Salary: {employee.salary}</p>
      </div>
    </div>
  );
};

export default ViewEmployee;
