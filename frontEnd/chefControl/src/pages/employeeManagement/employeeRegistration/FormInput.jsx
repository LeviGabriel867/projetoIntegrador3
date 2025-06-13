import React from "react";
import "./FormInput.css";

function FormInput({ icon: Icon, type = "text", placeholder }) {
  return (
    <div className="input-group">
      <Icon className="input-icon" />
      <input type={type} placeholder={placeholder} />
    </div>
  );
}

export default FormInput;
