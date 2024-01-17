import {createContext} from "react";
import {useAuth} from "../../../../../app/hooks/useAuth";
import {useRigs} from "../../../../../app/hooks/rigs/useRigs";
import {Rig} from "../../../../../app/entities/Rig";

interface ReportContextValues {
  rigs: Rig[] | {id: string; name: string}[];
}

export const ReportContext = createContext({} as ReportContextValues);

export const ReportProvider = ({children}: {children: React.ReactNode}) => {
  const {user, isUserAdm} = useAuth();

  // Mapeamento das rigs do usuário para exibir apenas as autorizadas
  const userRigs = user?.rigs.map(({rig: {id, name}}) => ({id, name})) || [];
  const {rigs} = useRigs(isUserAdm);
  console.log(rigs);
  return (
    <ReportContext.Provider value={{rigs}}>{children}</ReportContext.Provider>
  );
};
