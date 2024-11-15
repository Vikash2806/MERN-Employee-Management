// src/components/UpdateEmployee.js
import React, { useState } from 'react';
import axios from 'axios';

function UpdateEmployee({ refreshEmployees }) {
  const [employeeID, setEmployeeID] = useState('');
  const [employeeData, setEmployeeData] = useState({
    EmployeeName: '',
    Designation: '',
    Department: '',
    JoiningDate: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/employees/${employeeID}`, employeeData);
      setEmployeeID('');
      setEmployeeData({
        EmployeeName: '',
        Designation: '',
        Department: '',
        JoiningDate: '',
      });
      refreshEmployees();
      setError('');
    } catch (error) {
      setError('Error updating employee');
    }
  };

  return (
    <div>
      <h3>Update Employee</h3>
      <input type="text" placeholder="Employee ID" value={employeeID} onChange={(e) => setEmployeeID(e.target.value)} />
      <input type="text" name="EmployeeName" placeholder="Employee Name" value={employeeData.EmployeeName} onChange={handleChange} />
      <input type="text" name="Designation" placeholder="Designation" value={employeeData.Designation} onChange={handleChange} />
      <input type="text" name="Department" placeholder="Department" value={employeeData.Department} onChange={handleChange} />
      <input type="date" name="JoiningDate" value={employeeData.JoiningDate} onChange={handleChange} />
      <button onClick={handleUpdate}>Update Employee</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default UpdateEmployee;
