import { createContext, useState, useContext } from "react";

// Context yaratamiz
const LoadingContext = createContext();

// Custom hook (Context'dan foydalanish uchun)
// eslint-disable-next-line react-refresh/only-export-components
export const useLoading = () => useContext(LoadingContext);

// Provider komponenti
export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
