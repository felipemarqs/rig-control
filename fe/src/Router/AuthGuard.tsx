import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../app/hooks/useAuth";
//import {useAuth} from "../app/hooks/useAuth";

interface AuthGuardProps {
  isPrivate: Boolean;
}
export const AuthGuard = ({isPrivate}: AuthGuardProps) => {
  // Obtém o estado de autenticação do contexto
  const {signedIn} = useAuth();

  if (!signedIn && isPrivate) {
    return <Navigate to="/login" replace />;
  }

  if (signedIn && !isPrivate) {
    return <Navigate to="/" replace />;
  }
  // Se estiver autenticado e a rota for privada, permite o acesso à rota privada
  // Se não estiver autenticado e a rota não for privada, permite o acesso à rota pública
  return <Outlet />;
};
