import React from "react";
import "./SubmitButton.css";

function SubmitButton({ label = {labelSubmit}, onClick }) {
  return (
    <button type="submit" className="submit-button" onClick={onClick}>
      {label}
    </button>
  );
}

export default SubmitButton;
