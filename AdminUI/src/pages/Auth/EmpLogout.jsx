import React from 'react';
import { useUser } from '../../UserProvider'; // Adjust path as necessary

const EmpLogout = () => {
  const { setUserRole } = useUser(); // This will give you the setUserRole function

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setUserRole(null); // Reset user role in context
    // Add any additional logout logic (e.g., redirect)
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default EmpLogout;
