import React from "react";
import "./SubmitButton.css";

function SubmitButton({ label = "CADASTRAR", onClick }) {
  return (
    <button type="submit" className="submit-button" onClick={onClick}>
      {label}
    </button>
  );
}

export default SubmitButton;
