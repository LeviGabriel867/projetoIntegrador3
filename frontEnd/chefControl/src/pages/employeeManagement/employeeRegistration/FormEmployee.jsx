// src/pages/employeeManagement/employeeRegistration/employeeRegistration.jsx

import React, { useState } from 'react';
import { FaUser, FaUserTag, FaBriefcase, FaEnvelope, FaLock, FaCheckCircle } from 'react-icons/fa';
import HeaderPages from '../../../components/header/HeaderPages';
import './FormEmployee.css';

function FormEmployee() {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('garcom'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateEmployee = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Autenticação necessária. Faça o login novamente.');
      }
      
      const payload = { name, userName, role, email, password };
      const url = `http://localhost:3000/api/users`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar funcionário.');
      }
      
      setSuccess(`Funcionário "${data.name}" criado com sucesso!`);
      setName('');
      setUserName('');
      setRole('garcom');
      setEmail('');
      setPassword('');

      setTimeout(() => setSuccess(''), 4000);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-employee-page">
      <div className="form-employee-container">
        <header className="form-employee-header">
          <HeaderPages h1Header="ChefControl" pHeader="Preencha os dados para criar um novo acesso." />
        </header>

        <form onSubmit={handleCreateEmployee} className="employee-form">
          {error && <p className="form-message form-message--error">{error}</p>}
          {success && (
            <div className="form-message form-message--success">
              <FaCheckCircle /> 
              <span>{success}</span>
            </div>
          )}

          <div className="form-input-group">
            <FaUser className="input-icon" />
            <input type="text" placeholder="Nome completo" value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading} />
          </div>
          <div className="form-input-group">
            <FaUserTag className="input-icon" />
            <input type="text" placeholder="Nome de usuário" value={userName} onChange={(e) => setUserName(e.target.value)} required disabled={isLoading} />
          </div>
          <div className="form-input-group">
            <FaEnvelope className="input-icon" />
            <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} />
          </div>
          <div className="form-input-group">
            <FaLock className="input-icon" />
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" disabled={isLoading} />
          </div>

          <div className="form-input-group">
            <FaBriefcase className="input-icon" />
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              required
              disabled={isLoading}
            >
              <option value="garcom">Garçom</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Criando...' : 'Criar Funcionário'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormEmployee;