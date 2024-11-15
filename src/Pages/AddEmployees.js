// src/components/AddEmployee.js
import React, { useState } from 'react';
import axios from 'axios';

function AddEmployee({ refreshEmployees }) {
  const [employeeData, setEmployeeData] = useState({
    EmployeeName: '',
    EmployeeID: '',
    Designation: '',
    Department: '',
    JoiningDate: '',
  });

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/employees', employeeData);
      setEmployeeData({
        EmployeeName: '',
        EmployeeID: '',
        Designation: '',
        Department: '',
        JoiningDate: '',
      });
      refreshEmployees();
    } catch (error) {
      alert('Error adding employee');
    }
  };

  return (
    <div>
      <h3>Add Employee</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="EmployeeName" placeholder="Employee Name" value={employeeData.EmployeeName} onChange={handleChange} />
        <input type="text" name="EmployeeID" placeholder="Employee ID" value={employeeData.EmployeeID} onChange={handleChange} />
        <input type="text" name="Designation" placeholder="Designation" value={employeeData.Designation} onChange={handleChange} />
        <input type="text" name="Department" placeholder="Department" value={employeeData.Department} onChange={handleChange} />
        <input type="date" name="JoiningDate" value={employeeData.JoiningDate} onChange={handleChange} />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}

export default AddEmployee;
