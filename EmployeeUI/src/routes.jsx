import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";


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

import PrivateRoute from './components/common/PrivateRoute'; 
import UserProvider from './UserProvider'; // Adjust the path as necessary

const AppRoutes = () => (
  <UserProvider>
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    
    <Route path="/follow-up" element={<PrivateRoute><LeadFollowupPage /></PrivateRoute>} />
    <Route path="/follow-up/add-follow-up" element={<PrivateRoute><AddLeadFollowupForm /></PrivateRoute>} />
    <Route path="/follow-up/:id" element={<PrivateRoute><EditLeadFollowupForm /></PrivateRoute>} />

    <Route path="/emp_lead" element={<PrivateRoute><LeadsPage /></PrivateRoute>} />


  </Routes>
  </UserProvider>
);

export default AppRoutes;
