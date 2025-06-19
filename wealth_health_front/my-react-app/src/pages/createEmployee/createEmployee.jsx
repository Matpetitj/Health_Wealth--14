import "./createEmployee.scss"

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addEmployee } from '../../redux/slice/employeeSlice';

import DatePicker from 'react-datepicker';

import pays from "../../data/pays.json";
import departements from "../../data/departements.json";

import 'react-datepicker/dist/react-datepicker.css';

const CreateEmployee = () => {

  const dispatch = useDispatch();

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
    dispatch(addEmployee(formData));
    console.log('Employee created:', formData);
    setFormData({
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
  };

  return (
    <div className="createEmployee_container">
      <h1>Formulaire de création d'employé</h1>

      <form onSubmit={handleSubmit} id="create-employee">
        <label htmlFor="firstName">Prénom</label>
        <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} />

        <label htmlFor="lastName">Nom</label>
        <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} />

        <label htmlFor="dateOfBirth">Date de naissance</label>
        <DatePicker
          selected={formData.dateOfBirth}
          onChange={(date) => setFormData((prev) => ({ ...prev, dateOfBirth: date }))}
          dateFormat="yyyy-MM-dd"
          id="dateOfBirth"
          placeholderText="Sélectionnez une date"
        />

        <label htmlFor="startDate">Date d'entrée</label>
        <DatePicker
          selected={formData.startDate}
          onChange={(date) => setFormData((prev) => ({ ...prev, startDate: date }))}
          dateFormat="yyyy-MM-dd"
          id="startDate"
          placeholderText="Sélectionnez une date"
        />

        <fieldset className="address">
          <legend>Adresse</legend>

          <label htmlFor="street">Rue</label>
          <input type="text" id="street" value={formData.street} onChange={handleChange} />

          <label htmlFor="city">Ville</label>
          <input type="text" id="city" value={formData.city} onChange={handleChange} />

          <label htmlFor="state">Pays</label>
          <select id="state" value={formData.state} onChange={handleChange}>
            <option value="">Choisir un pays</option>
            {pays.map((pays) =>
            <option key={pays.code} value={pays.name}>
              {pays.name}
            </option>)}
          </select>

          <label htmlFor="zipCode">Code postal</label>
          <input type="number" id="zipCode" value={formData.zipCode} onChange={handleChange} />
        </fieldset>

        <label htmlFor="department">Département</label>
        <select id="department" value={formData.department} onChange={handleChange}>
          <option value="">Choisir un département</option>
          {departements.map((dept, idx) => 
            <option key={idx} value={dept}>{dept}</option>
          )}
        </select>

        <button type="submit">Sauvegarder</button>
      </form>
    </div>
  );
};

export default CreateEmployee;