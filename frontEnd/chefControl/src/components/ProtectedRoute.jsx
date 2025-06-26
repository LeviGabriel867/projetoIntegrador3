import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  // 1. O usuário está logado? (tem token e dados?)
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 2. O usuário tem a permissão necessária para esta rota?
  // `allowedRoles` é um array com as funções permitidas (ex: ['gerente'])
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redireciona para uma página de "acesso negado" ou de volta pra home
    return <Navigate to="/" replace />;
  }
  
  // 3. Se tudo estiver ok, renderiza a página solicitada
  return <Outlet />;
};

export default ProtectedRoute;