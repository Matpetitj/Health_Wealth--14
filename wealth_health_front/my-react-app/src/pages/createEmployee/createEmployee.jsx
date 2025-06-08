import "./createEmployee.scss"

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    startDate: null,
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: 'Sales',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Employee created:', formData);
  };

  return (
    <div className="container">
      <h1>HRnet</h1>
      <a href="/employee-list">View Current Employees</a>
      <h2>Create Employee</h2>

      <form onSubmit={handleSubmit} id="create-employee">
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} />

        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} />

        <label htmlFor="dateOfBirth">Date of Birth</label>
        <DatePicker
          selected={formData.dateOfBirth}
          onChange={(date) => setFormData((prev) => ({ ...prev, dateOfBirth: date }))}
          dateFormat="yyyy-MM-dd"
          id="dateOfBirth"
          placeholderText="Select date of birth"
        />

        <label htmlFor="startDate">Start Date</label>
        <DatePicker
          selected={formData.startDate}
          onChange={(date) => setFormData((prev) => ({ ...prev, startDate: date }))}
          dateFormat="yyyy-MM-dd"
          id="startDate"
          placeholderText="Select start date"
        />

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input type="text" id="street" value={formData.street} onChange={handleChange} />

          <label htmlFor="city">City</label>
          <input type="text" id="city" value={formData.city} onChange={handleChange} />

          <label htmlFor="state">State</label>
          <select id="state" value={formData.state} onChange={handleChange}>
            <option value="">-- Select State --</option>
            {/* Ajouter ici les options de states US si besoin */}
          </select>

          <label htmlFor="zipCode">Zip Code</label>
          <input type="number" id="zipCode" value={formData.zipCode} onChange={handleChange} />
        </fieldset>

        <label htmlFor="department">Department</label>
        <select id="department" value={formData.department} onChange={handleChange}>
          <option>Sales</option>
          <option>Marketing</option>
          <option>Engineering</option>
          <option>Human Resources</option>
          <option>Legal</option>
        </select>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreateEmployee;