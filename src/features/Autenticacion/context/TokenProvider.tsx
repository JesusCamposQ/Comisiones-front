import React, { createContext, useState } from "react";
interface tokenContextI {
  isAunteticacion: boolean;
  logout: () => void;
}
export const TokenContext = createContext<tokenContextI>({
  isAunteticacion: false,
  logout: () => {},
});

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAunteticacion, setIsAunteticacion] = useState<boolean>(true);

  const logout = () => {
    setIsAunteticacion(false);
  };
  return (
    <TokenContext.Provider value={{ isAunteticacion, logout }}>
      {children}
    </TokenContext.Provider>
  );
};
