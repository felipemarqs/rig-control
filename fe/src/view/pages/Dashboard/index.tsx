import {useAuth} from "../../../app/hooks/useAuth";

export const Dashboard = () => {
  const {signout, user} = useAuth();
  console.log({user});

  return (
    <div>
      <h1>Dashboard Page</h1>

      {user?.accessLevel === "ADM" && <p>Usuário ADMINISTRADOR</p>}
      {user?.accessLevel === "USER" && <p>Usuário USUÁRIO</p>}

      <button onClick={signout}>Sair</button>
    </div>
  );
};
