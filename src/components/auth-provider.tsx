"use client";

import { account } from "@/lib/integrations/appwrite";
import { ID, Models } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextProps = {
  loading: boolean;
  user: Models.User<Models.Preferences> | undefined;
  login: (email: string, password: string) => Promise<Models.Session>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<Models.Session>;
};

const AuthContext = createContext<AuthContextProps>({
  loading: true,
  user: undefined,
  login: function (email: string, password: string): Promise<Models.Session> {
    throw new Error("Function not implemented.");
  },
  logout: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  register: function (email: string, password: string, name?: string): Promise<Models.Session> {
    throw new Error("Function not implemented.");
  },
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider(props: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<Models.User<Models.Preferences>>();

  async function login(email: string, password: string) {
    const session = await account.createEmailPasswordSession(email, password);
    const user = await account.get();
    setUser(user);
    return session;
  }

  async function logout() {
    await account.deleteSession("current").then(() => setUser(undefined));
  }

  async function register(email: string, password: string, name?: string) {
    return await account.create(ID.unique(), email, password, name).then(() => login(email, password));
  }

  async function init() {
    try {
      const user = await account.get();
      setUser(user);
    } catch (err) {
      console.error(err);
      setUser(undefined);
    }
    setLoading(false);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <AuthContext.Provider value={{ loading, user, login, logout, register }}>{props.children}</AuthContext.Provider>
  );
}