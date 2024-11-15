const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Employees', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Define Employee Schema and Model
const employeeSchema = new mongoose.Schema({
  EmployeeName: String,
  EmployeeID: { type: String, unique: true },
  Designation: String,
  Department: String,
  JoiningDate: Date,
});

const Employee = mongoose.model('Employee', employeeSchema);

// Add Employee
app.post('/api/employees', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).send(employee);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Search Employee by EmployeeID
app.get('/api/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findOne({ EmployeeID: req.params.id });
    if (employee) res.send(employee);
    else res.status(404).send('Employee not found');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Update Employee Designation by EmployeeID
app.put('/api/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      { EmployeeID: req.params.id },
      { Designation: req.body.Designation },
      { new: true }
    );
    if (employee) res.send(employee);
    else res.status(404).send('Employee not found');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Start the Server
app.listen(5000, () => console.log('Server running on port 5000'));