import {Routes, Route, BrowserRouter} from "react-router-dom";
import {AuthGuard} from "./AuthGuard";
import {Login} from "../view/pages/Login";
import {Dashboard} from "../view/pages/Dashboard";
import {Register} from "../view/pages/Register";
import {AuthLayout} from "../view/Layouts/AuthLayout";
import {MainLayout} from "../view/Layouts/MainLayout/index";
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

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate={true} />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/form" element={<Form />} />
            <Route path="/list" element={<List />} />
            <Route path="/invoicing-dashboard" element={<BillingDashboard />} />
            <Route path="/invoicing-list" element={<ListBilling />} />
            <Route path="/details/:efficiencyId" element={<Details />} />
            <Route path="/rig" element={<CreateRig />} />
            <Route path="/create-contract" element={<CreateContract />} />
            <Route path="/contracts" element={<Contract />} />
            <Route path="/users" element={<ListUsers />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/users/:id" element={<UpdateUser />} />
            <Route path="/users/update-rigs/:id" element={<UpdateUserRigs />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
