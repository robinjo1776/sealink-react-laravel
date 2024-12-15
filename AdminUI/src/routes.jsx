import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";

import LeadsPage from "./pages/CRM/LeadsPage";
import AddLeadForm from "./components/CRM/AddLead/AddLeadForm";
import EditLeadForm from "./components/CRM/EditLead/EditLeadForm";
import LeadFollowupPage from "./pages/CRM/LeadFollowupPage";

import LeadQuotesPage from "./pages/Sales/LeadQuotesPage";

import CustomersPage from "./pages/Customers/CustomersPage";
import EditCustomerForm from "./components/Customers/EditCustomerForm";

import OrderPage from "./pages/Orders/OrderPage";
import AddOrderForm from "./components/Orders/AddOrderForm";
import EditOrderForm from "./components/Orders/EditOrderForm";

import CarrierPage from "./pages/Carriers&Co/CarrierPage";
import AddCarrierForm from "./components/Carriers&Co/AddCarrier/AddCarrierForm";
import EditCarrierForm from "./components/Carriers&Co/EditCarrier/EditCarrierForm";

import UserPage from "./pages/Account/UserPage";
import EditUserForm from "./components/Account/EditUserForm";

import PrivateRoute from "./components/common/PrivateRoute";
import UserProvider from "./UserProvider";

const AppRoutes = () => (
  <UserProvider>
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <LeadsPage />
          </PrivateRoute>
        }
      />

      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/lead"
        element={
          <PrivateRoute>
            <LeadsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/lead/add-lead"
        element={
          <PrivateRoute>
            <AddLeadForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/lead/:id"
        element={
          <PrivateRoute>
            <EditLeadForm />
          </PrivateRoute>
        }
      />

      <Route
        path="/follow-up"
        element={
          <PrivateRoute>
            <LeadFollowupPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/quotes-lead"
        element={
          <PrivateRoute>
            <LeadQuotesPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/customer"
        element={
          <PrivateRoute>
            <CustomersPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/customer/:id"
        element={
          <PrivateRoute>
            <EditCustomerForm />
          </PrivateRoute>
        }
      />

      <Route
        path="/order"
        element={
          <PrivateRoute>
            <OrderPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/order/add-order"
        element={
          <PrivateRoute>
            <AddOrderForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/order/:id"
        element={
          <PrivateRoute>
            <EditOrderForm />
          </PrivateRoute>
        }
      />

      <Route
        path="/user"
        element={
          <PrivateRoute>
            <UserPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/user/:id"
        element={
          <PrivateRoute>
            <EditUserForm />
          </PrivateRoute>
        }
      />

      <Route
        path="/carrier"
        element={
          <PrivateRoute>
            <CarrierPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/carrier/add-carrier"
        element={
          <PrivateRoute>
            <AddCarrierForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/carrier/:id"
        element={
          <PrivateRoute>
            <EditCarrierForm />
          </PrivateRoute>
        }
      />
    </Routes>
  </UserProvider>
);

export default AppRoutes;
