"use client";

import { createContext, useContext, useState } from "react";

const mainContext = createContext();

export default function Provider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
  return (
    <mainContext.Provider value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
}}>
      {children}
    </mainContext.Provider>
  );
}

export const useProvider = () => useContext(mainContext);
