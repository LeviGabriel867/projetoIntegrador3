import React from "react";
import "./FormContainer.css";

function FormContainer({ children }) {
  return <form className="form-box">{children}</form>;
}

export default FormContainer;
