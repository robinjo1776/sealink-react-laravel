import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';

import ShipmentPage from './pages/Sales/ShipmentPage';
import AddShipmentForm from './components/Sales/AddShipment/AddShipmentForm';
import EditShipmentForm from './components/Sales/EditShipment/EditShipmentForm';

import PrivateRoute from './components/common/PrivateRoute';
import UserProvider from './UserProvider';

const AppRoutes = () => (
  <UserProvider>
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <ShipmentPage />
          </PrivateRoute>
        }
      />

      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/shipment"
        element={
          <PrivateRoute>
            <ShipmentPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/shipment/add-shipment"
        element={
          <PrivateRoute>
            <AddShipmentForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/shipment/:id"
        element={
          <PrivateRoute>
            <EditShipmentForm />
          </PrivateRoute>
        }
      />
    </Routes>
  </UserProvider>
);

export default AppRoutes;
