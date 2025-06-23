import React, { useState } from "react";
import "./LoginPage.css";
import logoLoginPage from "../../assets/logoLoginPage.png";
import { HiOutlineMail } from "react-icons/hi";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  // 1. Estado para controlar o modo (true = Login, false = Criar Conta)
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Estados do formulário e de feedback
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 2. Função para alternar entre os modos
  const toggleMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
    // Limpa os campos e mensagens ao trocar de modo
    setEmail("");
    setPassword("");
    setError("");
    setSuccess("");
  };

  // 3. Função única de submit que decide o que fazer com base no modo
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const endpoint = isLoginMode ? "/login" : "/users";
    const url = `http://localhost:3000/api${endpoint}`; // Substitua 3001 pela sua porta

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ocorreu um erro.");
      }

      // 4. Lógica de sucesso diferente para cada modo
      if (isLoginMode) {
        localStorage.setItem("token", data.token);
        navigate("/homePage"); // Redireciona para a área logada
      } else {
        setSuccess("Conta criada com sucesso! Agora você pode fazer o login.");
        setIsLoginMode(true); // Muda para o modo de login automaticamente
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
        {/* 5. Título dinâmico */}
        <h2>{isLoginMode ? "Entre com seu acesso" : "Crie sua conta"}</h2>

        {error && <p className="login-error-message">{error}</p>}
        {success && <p className="login-success-message">{success}</p>}

        <form onSubmit={handleSubmit}>
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
            {/* 6. Texto do botão dinâmico */}
            {isLoading
              ? "Processando..."
              : isLoginMode
              ? "Entrar"
              : "Criar Conta"}
          </button>
        </form>

        {/* 7. Botão/Link para alternar o modo */}
        <div className="toggle-mode-container">
          <p>
            {isLoginMode ? "Não tem uma conta?" : "Já tem uma conta?"}
            <button type="button" onClick={toggleMode} className="toggle-mode-button">
              {isLoginMode ? "Crie uma aqui" : "Entre aqui"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;