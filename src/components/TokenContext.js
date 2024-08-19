import { createContext, useEffect, useState } from "react";

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);


  useEffect(() => {
    // 토큰이 로컬 스토리지에 있으면 상태 업데이트
    const savedToken = localStorage.getItem('BearerToken');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (newToken) => {
    setToken(newToken);
    setIsAuthenticated(true);
    localStorage.setItem('BearerToken', newToken);
  }

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('BearerToken');
  }

  return (
    <TokenContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </TokenContext.Provider>
  )
}


