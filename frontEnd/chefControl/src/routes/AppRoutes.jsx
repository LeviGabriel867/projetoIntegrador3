// seu arquivo de rotas: AppRoutes.jsx

import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

const Login = lazy(() => import("../pages/loginPage/LoginPage.jsx"));
const HomePage = lazy(() => import("../pages/homePage/HomePage.jsx"));
const FormPage = lazy(() => import("../pages/formRequest/FormPage.jsx"));
const TablesPage = lazy(() => import("../pages/tablesPage/TablesPage.jsx"));
const ProfileAdm = lazy(() => import("../pages/employeeManagement/profileAdm/ProfileAdm.jsx"));
const FormEmployee = lazy(() => import("../pages/employeeManagement/employeeRegistration/FormEmployee.jsx"));
const AllEmployeePage = lazy(() => import("../pages/employeeManagement/allEmployeePage/AllEmployeePage.jsx"));

const UnauthorizedPage = () => <div style={{textAlign: 'center', marginTop: '50px'}}><h1>403 - Acesso Negado</h1><p>Você não tem permissão para ver esta página.</p></div>;
const NotFoundPage = () => <div style={{textAlign: 'center', marginTop: '50px'}}><h1>404 - Página Não Encontrada</h1></div>;

function AppRoutes() {
  return (
    <Suspense fallback={<div style={{textAlign: 'center', marginTop: '50px'}}>Carregando...</div>}>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        
        {/* --- ROTAS PROTEGIDAS PARA O ADMIN --- */}
        {/* --- ATUALIZAÇÃO AQUI --- */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<ProfileAdm />} />
          <Route path="/admin/create-employee" element={<FormEmployee />} />
          <Route path="/admin/all-employees" element={<AllEmployeePage />} />
        </Route>

        {/* --- ROTAS PROTEGIDAS PARA O GARÇOM (E ADMIN TAMBÉM PODE ACESSAR) --- */}
        {/* --- ATUALIZAÇÃO AQUI --- */}
        <Route element={<ProtectedRoute allowedRoles={["garcom", "admin"]} />}>
          <Route path="/waiter" element={<FormPage />} />
          <Route path="/waiter/tables" element={<TablesPage />} />
        </Route>

        {/* Rota genérica ou de fallback */}
        <Route path="/homePage" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
export default AppRoutes;