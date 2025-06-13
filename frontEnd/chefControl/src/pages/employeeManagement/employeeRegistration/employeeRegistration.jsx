import React from "react";
import { FaUser, FaUserTag, FaEnvelope, FaLock } from "react-icons/fa";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";
import FormContainer from "./FormContainer";
import "./EmployeeRegistration.css";

function EmployeeRegistration() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de envio aqui
  };

  return (
    <div className="registration-container">
      <h1>ChefControl</h1>
      <p>Cadastrar colaborador</p>

      <FormContainer>
        <FormInput icon={FaUser} placeholder="Nome" />
        <FormInput icon={FaUserTag} placeholder="Nome de usuario" />
        <FormInput icon={FaEnvelope} type="email" placeholder="Email" />
        <FormInput icon={FaLock} type="password" placeholder="Criar senha" />
        <FormInput icon={FaLock} type="password" placeholder="Confirmar senha" />
        <SubmitButton onClick={handleSubmit} />
      </FormContainer>
    </div>
  );
}

export default EmployeeRegistration;
