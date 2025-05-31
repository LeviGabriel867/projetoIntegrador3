import {Routes, Route} from 'react-router-dom';
import {lazy, Suspense } from 'react'

const Login = lazy(() => import('../pages/loginPage/LoginPage.jsx'));
const HomePage = lazy(() => import('../pages/homePage/HomePage.jsx'));
const FormPage = lazy(() => import('../pages/formRequest/FormPage.jsx'));
const TablesPage = lazy(() => import('../pages/tablesPage/TablesPage.jsx'));

function AppRoutes(){
    return(
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/homePage' element={<HomePage/>}/>
                <Route path='/formPage' element={<FormPage/>}/>
                <Route path='/tablesPage' element={<TablesPage/>}/>
            </Routes>
        </Suspense>
    )
}
export default AppRoutes