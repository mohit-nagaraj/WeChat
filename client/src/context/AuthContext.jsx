import { createContext, useCallback, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthContextProvider component
//eslint-disable-next-line
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user state with data from localStorage if it exists
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : {};
  });

  const updateUser = useCallback((newUser) => {
    // Update user state and persist it to localStorage
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  }, []);

  useEffect(() => {
    // Fetch user data from localStorage when the component mounts
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
