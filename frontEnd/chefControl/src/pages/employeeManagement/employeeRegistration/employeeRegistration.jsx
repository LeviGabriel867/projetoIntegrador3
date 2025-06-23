import React from "react";
import { FaUser, FaUserTag, FaEnvelope, FaLock } from "react-icons/fa";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";
import FormContainer from "./FormContainer";
import {useNavigate} from "react-router-dom";
import "./EmployeeRegistration.css";

function EmployeeRegistration() {

  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de envio aqui
  };

  const handleColaboratorManagement = (e) => {
    e.preventDefault();
    navigate("/allEmployeePage")
  };
  return (
    <div className="registration-container">
      <h1>ChefControl</h1>
      <p>Cadastrar colaborador</p>

      <FormContainer>
        <FormInput icon={FaUser} placeholder="Nome" />
        <FormInput icon={FaUserTag} placeholder="Nome de colaborador" />
        <FormInput icon={FaEnvelope} type="email" placeholder="Email" />
        <FormInput icon={FaLock} type="password" placeholder="Criar senha" />
        <FormInput icon={FaLock} type="password" placeholder="Confirmar senha" />
        <SubmitButton label={"Cadastrar"} onClick={handleSubmit} />
        <SubmitButton label={"Gerenciar colaboradore"} onClick={handleColaboratorManagement} />
      </FormContainer>
    </div>
  );
}

export default EmployeeRegistration;
