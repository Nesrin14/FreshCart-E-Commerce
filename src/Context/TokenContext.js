import { createContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';

export let userContext = createContext();

export default function UserContextProvider({ children }) {
  const [userToken, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem('userToken');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const { id } = decodedToken;

        setToken(token);
        setUserId(id);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

  return (
    <userContext.Provider value={{ userToken, setToken, userId, setUserId }}>
      {children}
    </userContext.Provider>
  );
}
