// src/pages/loginPage/LoginPage.jsx

import React, { useState } from "react";
import "./LoginPage.css";
import logoLoginPage from "../../assets/logoLoginPage.png";
import { HiOutlineMail } from "react-icons/hi";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const url = `http://localhost:3000/api/login`;
    const payload = { email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ocorreu um erro no login.");
      }

      if (data.token && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // --- ATUALIZAÇÃO AQUI ---
        // Verificando a role "admin" para redirecionar
        if (data.user.role === "admin") {
          navigate("/admin"); // Redireciona para a página de admin
        } else if (data.user.role === "garcom") {
          navigate("/waiter"); // Redireciona para a página do garçom
        } else {
          // Fallback para uma página genérica, se necessário
          navigate("/homePage");
        }
      } else {
        throw new Error("Resposta de login inválida do servidor.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="loginPage">
      <h1>ChefControl</h1>
      <div className="logoWrapper">
        <img src={logoLoginPage} alt="Logo" className="logoLoginPage" />
      </div>

      <div className="formLoginPage">
        <h2>Entre com seu acesso</h2>

        {error && <p className="login-error-message">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="inputEmail">
            <HiOutlineMail />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="inputPassword">
            <FaLock />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="loginButton" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;