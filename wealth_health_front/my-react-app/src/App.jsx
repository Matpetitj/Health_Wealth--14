import { Routes, Route } from "react-router-dom";

import Header from "./components/header/header"
import CreateEmployee from "./pages/createEmployee/createEmployee"
import ListEmployee from "./pages/listEmployees/listEmployees"

import './App.css'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<CreateEmployee />} />
        <Route path="employees" element={<ListEmployee />} />
      </Routes>
    </>
  )
}

export default App
