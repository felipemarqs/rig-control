// Importando bibliotecas e componentes necessários
import {Routes, Route, BrowserRouter} from "react-router-dom";
import {AuthGuard} from "./AuthGuard";
import {Login} from "../view/pages/Login";
import {Dashboard} from "../view/pages/Dashboard";
import {Register} from "../view/pages/Register";
import {AuthLayout} from "../view/Layouts/AuthLayout";
import {DesktopLayout} from "../view/Layouts/DesktopLayout/index";
import {Form} from "../view/pages/Form";
import {List} from "../view/pages/List";
import {BillingDashboard} from "../view/pages/BillingDashboard";
import {ListBilling} from "../view/pages/BillingList";
import {Details} from "../view/pages/Details";
import {CreateRig} from "../view/pages/CreateRig";
import {CreateContract} from "../view/pages/CreateContract";
import {Contract} from "../view/pages/Contract";
import {ListUsers} from "../view/pages/ListUsers";
import {CreateUser} from "../view/pages/CreateUser";
import {UpdateUser} from "../view/pages/UpdateUser";
import {UpdateUserRigs} from "../view/pages/UpdateUserRigs";
import {DeletionRequests} from "../view/pages/DeletionRequests";
import {MobileLayout} from "../view/Layouts/MobileLayout";
import {useSidebarContext} from "../app/contexts/SidebarContext";
import {ListRigs} from "../view/pages/ListRigs";
import {BillingRigDetailDashboard} from "../view/pages/BillingRigDetailDashboard";
//import { InDevelopmentPage } from "../view/pages/InDevelopmentPage";
import {UpdateForm} from "../view/pages/UpdateForm";
import {Report} from "../view/pages/Report";
import {InvoicingMenu} from "../view/pages/InvoicingMenu";
import {GlobalDashboard} from "../view/pages/GlobalDashboard";
import {DashboardMenu} from "../view/pages/DashboardMenu";
import {useAuth} from "../app/hooks/useAuth";

export const Router = () => {
  const {windowWidth} = useSidebarContext();
  const {isUserAdm} = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota para páginas não autenticadas */}
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        {/* Rota para páginas autenticadas */}
        <Route element={<AuthGuard isPrivate={true} />}>
          {/* Define o layout baseado na largura da janela */}
          <Route element={<DesktopLayout />}>
            <Route path="/" element={<DashboardMenu />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/global-dashboard"
              element={isUserAdm ? <GlobalDashboard /> : <Dashboard />}
            />

            <Route path="/form" element={<Form />} />
            <Route path="/form/:efficiencyId" element={<UpdateForm />} />

            <Route path="/list" element={<List />} />
            <Route path="/invoicing-dashboard" element={<BillingDashboard />} />
            <Route
              path="/invoicing-rig-dashboard"
              element={<BillingRigDetailDashboard />}
            />
            <Route path="/invoicing-list" element={<ListBilling />} />
            <Route path="/invoicing" element={<InvoicingMenu />} />

            <Route path="/details/:efficiencyId" element={<Details />} />
            <Route path="/create-rig" element={<CreateRig />} />
            <Route path="/list-rigs" element={<ListRigs />} />
            <Route path="/create-contract" element={<CreateContract />} />
            <Route path="/contracts" element={<Contract />} />
            <Route path="/users" element={<ListUsers />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/users/:id" element={<UpdateUser />} />
            <Route path="/users/update-rigs/:id" element={<UpdateUserRigs />} />
            <Route path="/deletion-requests" element={<DeletionRequests />} />
            <Route path="/reports" element={<Report />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
