// src/components/SearchEmployee.js
import React, { useState } from 'react';
import axios from 'axios';

function SearchEmployee() {
  const [employeeID, setEmployeeID] = useState('');
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/employees/${employeeID}`);
      setEmployee(response.data);
      setError('');
    } catch (error) {
      setEmployee(null);
      setError('No employee found!');
    }
  };

  return (
    <div>
      <h3>Search Employee</h3>
      <input type="text" placeholder="Employee ID" value={employeeID} onChange={(e) => setEmployeeID(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {employee && (
        <div>
          <h4>Employee Details</h4>
          <p>Name: {employee.EmployeeName}</p>
          <p>Employee ID: {employee.EmployeeID}</p>
          <p>Designation: {employee.Designation}</p>
          <p>Department: {employee.Department}</p>
          <p>Joining Date: {employee.JoiningDate}</p>
        </div>
      )}
    </div>
  );
}

export default SearchEmployee;
