import React from "react";
import "./LoginPage.css";
import logoLoginPage from "../../assets/logoLoginPage.png";
import { HiOutlineMail } from "react-icons/hi";
import { FaLock } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const navigate = useNavigate();
  const handleHomePage = () => {
    navigate("/homePage");
  };

  return (
    <div className="loginPage">
      <h1>ChefControl</h1>

      <div className="logoWrapper">
        <img src={logoLoginPage} alt="Logo" className="logoLoginPage" />
      </div>

      <div className="formLoginPage">
        <h2>Entre com seu acesso</h2>
        <form>
          <div className="inputEmail">
            <HiOutlineMail />
            <input type="text" placeholder="E-mail" />
          </div>

          <div className="inputPassword">
            <FaLock />
            <input type="password" placeholder="Senha" />
          </div>

          <button
            className="loginButton"
            onClick={(e) => {
              e.preventDefault();
              handleHomePage();
            }}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
export default LoginPage;
