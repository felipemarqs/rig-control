import {createContext, useCallback, useEffect, useState} from "react";
import {localStorageKeys} from "../config/localStorageKeys";
import {useQuery} from "@tanstack/react-query";
import {usersService} from "../services/usersService";
import {User} from "../entities/User";
import {treatAxiosError} from "../utils/treatAxiosError";
import {AxiosError} from "axios";
import {PageLoader} from "../../view/components/PageLoader";
import {AccessLevel} from "../entities/AccessLevel";

interface AuthContextValue {
  signedIn: boolean;
  isUserAdm: boolean;
  isAlertSeen: boolean;
  userAccessLevel: AccessLevel;
  user: User | undefined;
  signin(accessToken: string): void;
  signout(): void;
  handleIsAlertSeen(): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN
    );

    return !!storedAccessToken;
  });

  const [isAlertSeen, setIsAlertSeen] = useState(true);

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    setSignedIn(false);
    remove();
  }, []);

  const handleIsAlertSeen = () => [setIsAlertSeen(true)];

  const {data, isError, error, isFetching, isSuccess, remove} = useQuery({
    queryKey: ["users", "me"],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  });

  const isUserAdm = data?.accessLevel === "ADM" ? true : false;

  const userAccessLevel = data?.accessLevel!;

  useEffect(() => {
    if (isError) {
      treatAxiosError((error as Error) || AxiosError);
      signout();
    }
  }, [isError, signout]);

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        signin,
        signout,
        user: data,
        isUserAdm,
        userAccessLevel,
        isAlertSeen,
        handleIsAlertSeen,
      }}
    >
      {true && <PageLoader isLoading={isFetching} />}
      {!isFetching && children}
    </AuthContext.Provider>
  );
};
