import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import EmpLoginPage from "./pages/Auth/EmpLoginPage";

import LeadsPage from "./pages/CRM/LeadsPage";
import AddLeadForm from "./components/CRM/AddLeadForm";
import EditLeadForm from "./components/CRM/EditLeadForm";

import LeadFollowupPage from "./pages/CRM/LeadFollowupPage";
import AddLeadFollowupForm from "./components/CRM/AddLeadFollowupForm";
import EditLeadFollowupForm from "./components/CRM/EditLeadFollowupForm";

import CustomersPage from "./pages/Customers/CustomersPage";
import AddCustomerForm from "./components/Customers/AddCustomerForm";
import EditCustomerForm from "./components/Customers/EditCustomerForm";

import OrderPage from "./pages/Orders/OrderPage";
import AddOrderForm from "./components/Orders/AddOrderForm";
import EditOrderForm from "./components/Orders/EditOrderForm";

import UserPage from "./pages/Account/UserPage";
import EditUserForm from "./components/Account/EditUserForm"; // Ensure this path is correct

import EmpLeadPage from "./pages/Employee/EmpLeadPage";
import PrivateRoute from './components/common/PrivateRoute'; 
import UserProvider from './UserProvider'; // Adjust the path as necessary

const AppRoutes = () => (
  <UserProvider>
  <Routes>
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/login" element={<LoginPage />} />

    <Route path="/lead" element={<PrivateRoute><LeadsPage /></PrivateRoute>} />
    <Route path="/lead/add-lead" element={<PrivateRoute><AddLeadForm /></PrivateRoute>} />
    <Route path="/lead/:id" element={<PrivateRoute><EditLeadForm /></PrivateRoute>} />
    
    <Route path="/follow-up" element={<PrivateRoute><LeadFollowupPage /></PrivateRoute>} />
    <Route path="/follow-up/add-follow-up" element={<PrivateRoute><AddLeadFollowupForm /></PrivateRoute>} />
    <Route path="/follow-up/:id" element={<PrivateRoute><EditLeadFollowupForm /></PrivateRoute>} />

    <Route path="/customer" element={<PrivateRoute><CustomersPage /></PrivateRoute>} />
    <Route path="/customer/add-customer" element={<PrivateRoute><AddCustomerForm /></PrivateRoute>} />
    <Route path="/customer/:id" element={<PrivateRoute><EditCustomerForm /></PrivateRoute>} />

    <Route path="/order" element={<PrivateRoute><OrderPage /></PrivateRoute>} />
    <Route path="/order/add-order" element={<PrivateRoute><AddOrderForm /></PrivateRoute>} />
    <Route path="/order/:id" element={<PrivateRoute><EditOrderForm /></PrivateRoute>} />

    <Route path="/user" element={<PrivateRoute><UserPage /></PrivateRoute>} />
    <Route path="/user/:id" element={<PrivateRoute><EditUserForm /></PrivateRoute>} />

    <Route path="/emp_login" element={<EmpLoginPage />} />
    <Route path="/emp_lead" element={<PrivateRoute><EmpLeadPage /></PrivateRoute>} />

  </Routes>
  </UserProvider>
);

export default AppRoutes;
