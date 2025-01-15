import React, { ReactNode, createContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { removeAllToken } from "../utils/helper";
import { IFullUser } from "../types/user.type";

interface AuthContextType {
  auth: IFullUser;
  // eslint-disable-next-line no-unused-vars
  changeAuth: (newAuth: IFullUser) => void;
  removeAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line react/prop-types
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useLocalStorageState({
    key: "auth",
    initialState: null,
  });

  function changeAuth(newAuth: IFullUser) {
    setAuth(newAuth);
  }

  function removeAuth() {
    setAuth(null);
    removeAllToken();
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        changeAuth,
        removeAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
