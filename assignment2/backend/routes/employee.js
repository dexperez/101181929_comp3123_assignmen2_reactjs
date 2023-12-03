const express = require("express");
const EmpModel = require("../model/Employee");
const routes = express.Router();
const cors = require('cors');


routes.use(cors());

// List all employee
// http://localhost:8080/api/v1/emp/employee
routes.get("/employee", async (req, res) => {
  try {
    const employeeList = await EmpModel.find({});
    res.status(200).json(employeeList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new employee
// http://localhost:8080/api/v1/emp/employee
routes.post("/employee", async (req, res) => {
  try {
    const newEmp = new EmpModel(req.body);
    await newEmp.save();
    res.status(201).json({ message: "New employee has been created" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        message: `Employee with email '${req.body.email}' already exists`,
      });
    } else if (error.name === "ValidationError") {
      res
        .status(400)
        .json({ message: "Gender must only be either Male, Female or Other" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Get employee by ID
// http://localhost:8080/api/v1/emp/employee/{id}
routes.get("/employee/:id", async (req, res) => {
  try {
    const employee = await EmpModel.findById(req.params.id);
    if (!employee) {
      res
        .status(404)
        .json({ message: `Employee with ID ${req.params.id} doesn't exist` });
      return;
    }
    res.status(200).json(employee);
  } catch (error) {
    if (error.name === "CastError") {
      res
        .status(400)
        .json({ message: `Employee with ID ${req.params.id} doesn't exist` });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Update employee by ID
// http://localhost:8080/api/v1/emp/employee/{id}
routes.put("/employee/:id", async (req, res) => {
  try {
    const employee = await EmpModel.findByIdAndUpdate(req.params.id, req.body);
    if (!employee) {
      res
        .status(404)
        .json({ message: `Employee with ID ${req.params.id} doesn't exist` });
      return;
    }
    res.status(200).json({ message: "Employee info has been updated" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(500).json({ message: `Employee with ID ${req.params._id} already exists` });
    } else if (error.name === "CastError") {
      res
        .status(400)
        .json({ message: `Employee with ID ${req.params.id} doesn't exist` });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Delete employee by ID
// http://localhost:8080/api/v1/emp/employee?id={id}
routes.delete("/employee", async (req, res) => {
  try {
    const employee = await EmpModel.findByIdAndDelete(req.query.id);
    if (!employee) {
      res
        .status(404)
        .json({ message: `Employee with ID ${req.params.id} doesn't exist` });
      return;
    }
    res.status(200).json({ message: `Employee has been deleted.`});
  } catch (error) {
    if (error.name === "CastError") {
      res
        .status(404)
        .json({ message: `Employee with ID ${req.params.id} doesn't exist` });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = routes;
