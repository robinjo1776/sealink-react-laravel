import React, { createContext, useState, useEffect } from 'react';

// Create a context for the user
export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    
    if (userId && userRole) {
      setCurrentUser({ id: userId, role: userRole });
    } else {
      setCurrentUser(null); // Handle if user data is missing
    }

    setLoading(false); // Set loading to false after checking the user data
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
