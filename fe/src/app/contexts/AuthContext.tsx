import {createContext, useCallback, useEffect, useState} from "react";
import {localStorageKeys} from "../config/localStorageKeys";
import {useQuery} from "@tanstack/react-query";
import {usersService} from "../services/usersService";
import {User} from "../entities/User";

interface AuthContextValue {
  signedIn: boolean;

  user: User | undefined;
  signin(accessToken: string): void;
  signout(): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN
    );

    return !!storedAccessToken;
  });

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);

    setSignedIn(false);
  }, []);

  const {data} = useQuery({
    queryKey: ["users", "me"],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  });

  return (
    <AuthContext.Provider value={{signedIn, signin, signout, user: data}}>
      {children}
    </AuthContext.Provider>
  );
};
