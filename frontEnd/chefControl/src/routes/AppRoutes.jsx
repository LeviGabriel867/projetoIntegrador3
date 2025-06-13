import {Routes, Route} from 'react-router-dom';
import {lazy, Suspense } from 'react'

const Login = lazy(() => import('../pages/loginPage/LoginPage.jsx'));
const HomePage = lazy(() => import('../pages/homePage/HomePage.jsx'));
const FormPage = lazy(() => import('../pages/formRequest/FormPage.jsx'));
const TablesPage = lazy(() => import('../pages/tablesPage/TablesPage.jsx'));
const ProfileAdm = lazy(() => import('../pages/employeeManagement/profileAdm/ProfileAdm.jsx'));
const FormEmployee = lazy(() => import('../pages/employeeManagement/employeeRegistration/employeeRegistration.jsx'))
function AppRoutes(){
    return(
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/homePage' element={<HomePage/>}/>
                <Route path='/formPage' element={<FormPage/>}/>
                <Route path='/tablesPage' element={<TablesPage/>}/>
                <Route path='/profileAdm' element={<ProfileAdm/>}/>
                <Route path='/formEmployee' element={<FormEmployee/>}/>
            </Routes>
        </Suspense>
    )
}
export default AppRoutes