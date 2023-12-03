import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/updateEmployee.css';


const UpdateEmployee = () => {
  const { _id } = useParams();
  const [employee, setEmployee] = useState({
    _id: '',
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    salary: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/emp/employees/${_id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error("Error retrieving employee details: " + error);
      }
    };
    fetchEmployeeDetails();
  }, [_id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/v1/emp/employees/${_id}`, employee);
      navigate('/employeeList');
    } catch (error) {
      console.error('Error updating employee: ' + error);
    }
  };

  return (
    <div className="update-employee-container">
      <h2>Update Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">First Name:</label>
          <input type="text" id="first_name" value={employee.first_name} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name:</label>
          <input type="text" id="last_name" value={employee.last_name} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" value={employee.email} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <input type="text" id="gender" value={employee.gender} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="salary">Salary:</label>
          <input type="text" id="salary" value={employee.salary} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <button type="submit">Update</button>
          <Link to="/employeeList">
            <button id="cancelBtn">Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmployee;
