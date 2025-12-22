import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "../pages/Home/HomePage";
import { LoginPage } from '../pages/Login/LoginPage';
import { RegisterPage } from '../pages/Register/RegisterPage';
import { Page403 } from '../pages/Page403/Page403';
import { Page404 } from '../pages/Page404/Page404';
import { ProtectedRoutes } from './ProtectedRoutes';
import { GridUsersPage } from "../pages/Users/GridUsersPage/GridUsersPage";
import { FormUsersPage } from "../pages/Users/FormUsersPage/FormUsersPage";


export const Navigation = () => {
  return (
      <BrowserRouter>

    <Routes>
        <Route path="/" element={<ProtectedRoutes> <HomePage /> </ProtectedRoutes> } />
        <Route path="/usuarios" element={<ProtectedRoutes requiredRole="admin"> <GridUsersPage /> </ProtectedRoutes> } />
        <Route path="/usuarios/:id" element={<ProtectedRoutes requiredRole="admin"> <FormUsersPage /> </ProtectedRoutes> } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<Page403 />} />
        <Route path="*" element={<Page404 />} />
    </Routes>
      </BrowserRouter>

  )
}