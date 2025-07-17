// src/components/ProtectedRoute.jsx (VERSÃO REFINADA)

import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  // A busca dos dados do localStorage está perfeita.
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const location = useLocation(); // Usado para redirecionar de volta após o login

  // --- Verificação de Autenticação (Login) ---
  // Se não houver token OU informações do usuário, ele não está logado.
  if (!token || !user) {
    // Redireciona para a página de login.
    // O 'state' salva a página que ele tentou acessar para que, após o login,
    // ele seja enviado para o lugar certo.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // --- Verificação de Autorização (Permissão/Role) ---
  // Esta verificação só acontece se o usuário JÁ ESTIVER LOGADO.
  // 'allowedRoles' é o array de permissões passado pela rota (ex: ["admin", "garcom"]).
  // Verifica se a role do nosso usuário está incluída na lista de permissões.
  if (allowedRoles.includes(user.role)) {
    // Se a role do usuário for permitida, renderiza o componente da rota (a página).
    return <Outlet />;
  } else {
    // Se o usuário está logado, MAS sua role não permite acesso a esta rota,
    // o redirecionamos para a página "Não Autorizado".
    return <Navigate to="/unauthorized" replace />;
  }
};

export default ProtectedRoute;