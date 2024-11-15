// src/components/HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddEmployee from './AddEmployees';
import SearchEmployee from './SearchEmployee';
import UpdateEmployee from './UpdateEmployees';

function HomePage() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      setEmployees(response.data);
    } catch (err) {
      console.error("Error fetching the employees: ", err);
    }
  };

  return (
    <div className="HomePage">
      <h2>Employees:</h2>
      <ul>
        {employees.map((employee, index) => (
          <li key={index}>
            {employee.EmployeeName} - {employee.EmployeeID} - {employee.Designation}
          </li>
        ))}
      </ul>
      <AddEmployee refreshEmployees={fetchEmployees} />
      <SearchEmployee />
      <UpdateEmployee refreshEmployees={fetchEmployees} />
    </div>
  );
}

export default HomePage;
