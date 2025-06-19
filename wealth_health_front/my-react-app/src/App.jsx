import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadInitialEmployees } from "./redux/slice/employeeSlice";
import Employees from "./data/employees.json";

import { Routes, Route } from "react-router-dom";

import Header from "./components/header/header";
import CreateEmployee from "./pages/createEmployee/createEmployee";
import ListEmployee from "./pages/listEmployees/listEmployees";

import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadInitialEmployees(Employees));
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<CreateEmployee />} />
          <Route path="employees" element={<ListEmployee />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

