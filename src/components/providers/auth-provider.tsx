"use client";

import { account } from "@/lib/integrations/appwrite/main";
import { UserPrefs } from "@/lib/integrations/appwrite/types";
import { ID, Models } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextProps = {
  loading: boolean;
  user: Models.User<UserPrefs> | undefined;
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
  login: function (email: string, password: string): Promise<Models.Session> {
    throw new Error("Function not implemented.");
  },
  logout: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  register: function (email: string, password: string, name?: string): Promise<Models.Session> {
    throw new Error("Function not implemented.");
  },
  refresh: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider(props: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<Models.User<UserPrefs>>();
  const [session, setSession] = useState<Models.Session>();

  const login = async (email: string, password: string) => {
    const session = await account.createEmailPasswordSession(email, password);
    const user = await account.get();
    setUser(user);
    setSession(session);
    return session;
  };

  const logout = async () => {
    await account.deleteSession("current").then(() => {
      setUser(undefined);
      setSession(undefined);
    });
  };

  const register = async (email: string, password: string, name?: string) => {
    return await account.create(ID.unique(), email, password, name).then(() => login(email, password));
  };

  const refresh = async () => {
    try {
      const user = await account.get();
      const session = await account.getSession("current");
      setUser(user);
      setSession(session);
    } catch (err) {
      console.error(err);
      setUser(undefined);
      setSession(undefined);
    }
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