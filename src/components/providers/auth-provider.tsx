"use client";

import { User } from "@/lib/integrations/appwrite/types";
import { getUser, loginUser, logoutUser, registerUser } from "@/lib/integrations/appwrite/utils";
import { Models } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextProps = {
  loading: boolean;
  user: User | undefined;
  session: Models.Session | undefined;
  login: (email: string, password: string) => Promise<Models.Session>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<Models.Session>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextProps>({
  loading: true,
  user: undefined,
  session: undefined,
  login: () => {
    throw new Error("Function not implemented.");
  },
  logout: () => {
    throw new Error("Function not implemented.");
  },
  register: () => {
    throw new Error("Function not implemented.");
  },
  refresh: () => {
    throw new Error("Function not implemented.");
  },
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider(props: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const [session, setSession] = useState<Models.Session>();

  const login = async (email: string, password: string) => {
    return await loginUser(email, password).then(({ session, user }) => {
      setUser(user);
      setSession(session);
      return session;
    });
  };

  const logout = async () => {
    await logoutUser().then(() => {
      setUser(undefined);
      setSession(undefined);
    });
  };

  const register = async (email: string, password: string, name?: string) => {
    return await registerUser(email, password, name).then(({ session, user }) => {
      setUser(user);
      setSession(session);
      return session;
    });
  };

  const refresh = async () => {
    await getUser().then((data) => {
      if (data) {
        setUser(data.user);
        setSession(data.session);
      } else {
        setUser(undefined);
        setSession(undefined);
      }
    });
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <AuthContext.Provider value={{ loading, user, session, login, logout, register, refresh }}>
      {props.children}
    </AuthContext.Provider>
  );
}