import "./createEmployee.scss"

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addEmployee } from '../../redux/slice/employeeSlice';

import Modal from 'djyn-custom-lib-modal';

import CustomDatePicker from "../../components/datePicker/datePicker";

import pays from "../../data/pays.json";
import departements from "../../data/departements.json";

import 'react-datepicker/dist/react-datepicker.css';

const CreateEmployee = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Expressions pour validation
  const nameRegex = /^[A-Za-zÀ-ÿ\s'-]+$/;
  const zipCodeRegex = /^[0-9]{4,10}$/;

  // Vérifications simples
  if (
    !formData.firstName.match(nameRegex) ||
    !formData.lastName.match(nameRegex) ||
    !formData.dateOfBirth ||
    !formData.startDate ||
    formData.street.trim() === '' ||
    formData.city.trim() === '' ||
    formData.state.trim() === '' ||
    !formData.zipCode.toString().match(zipCodeRegex) ||
    formData.department.trim() === ''
  ) {
    alert("Merci de remplir correctement tous les champs.");
    return;
  }

  dispatch(addEmployee(formData));
  setIsModalOpen(true);

  // Reset
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
      <h1 className="createEmployee_title">Formulaire de création d'employé</h1>

      <form onSubmit={handleSubmit} id="create-employee">
        <label htmlFor="firstName">Prénom</label>
        <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} />

        <label htmlFor="lastName">Nom</label>
        <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} />

        <label htmlFor="dateOfBirth">Date de naissance</label>
        <CustomDatePicker
          selected={formData.dateOfBirth}
          onChange={(date) => setFormData((prev) => ({ ...prev, dateOfBirth: date }))}
          placeholder="Date de naissance"
          backgroundColor="#fff"
          textColor="#4f772d"
          borderColor="#4f772d"
        />

        <label htmlFor="startDate">Date d'entrée</label>
        <CustomDatePicker
          selected={formData.startDate}
          onChange={(date) => setFormData((prev) => ({ ...prev, startDate: date }))}
          placeholder="Date d'entrée"
          backgroundColor="#fff"
          textColor="#4f772d"
          borderColor="#4f772d"
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        backgroundColor="#00000088"
        textColor="#4f772d"
        closeButtonColor="#333"
      >
        <h2>Employé(e) ajouté(e)</h2>
      </Modal>
    </div>
  );
};

export default CreateEmployee;