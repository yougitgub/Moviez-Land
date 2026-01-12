"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";



const mainContext = createContext();

export default function Provider({ children, session }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!session);
  const [user, setUser] = useState(session?.user || null);

  useEffect(() => {
    if (session) {
      setIsLoggedIn(true);
      setUser(session.user);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, [session]);

  return (
    <SessionProvider session={session}>
      <mainContext.Provider value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
      }}>
        {children}
      </mainContext.Provider>
    </SessionProvider>
  );
}


export const useProvider = () => useContext(mainContext);
