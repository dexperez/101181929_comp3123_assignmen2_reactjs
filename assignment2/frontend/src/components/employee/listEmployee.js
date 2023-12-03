import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './css/listEmployee.css';

const EmployeeList = ({ setLoggedInUser }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/emp/employee');
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching all employees: " + error);
      }
    };

    fetchAllEmployees();
  }, []);

  const deleteEmployee = async (_id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/emp/employee?id=${_id}`);
      const response = await axios.get('http://localhost:8080/api/v1/emp/employee');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error deleting employee: ' + error);
    }
  };
  

  return (
    <div className='employeelist-container'>
      <h2>Employee List</h2>
      <Link to="/addEmployee">
        <button>Add Employee</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee._id}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>{employee.salary}</td>
              <td>
                <Link to={`/updateEmployee/${employee._id}`}>
                  <button className='update'>Update</button>
                </Link>
                <Link to={`/employeelist`}>
                  <button className='delete' onClick={() => deleteEmployee(employee._id)}>Delete</button>
                </Link>
                <Link to={`/viewEmployee/${employee._id}`}>
                  <button className='view'>View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
