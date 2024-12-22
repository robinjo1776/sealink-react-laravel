import { createContext, useState, useEffect } from "react";

// Create a context for the user
export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for user data in localStorage
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");

    if (userId && userRole) {
      setCurrentUser({ id: userId, role: userRole });
    } else {
      setCurrentUser(null);
    }

    setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
