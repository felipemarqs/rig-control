import { CircleUser, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate, Link } from "react-router-dom";

import logo from "@/assets/images/white-logo.png";
import { useAuth } from "@/app/hooks/useAuth";
import { ModeToggle } from "./ModeToggle";
import { useSidebarContext } from "@/app/contexts/SidebarContext";
import { cn } from "@/lib/utils";

const NavigationLinks = () => {
  const { activeTab, handleToggleNavItem } = useSidebarContext();
  return (
    <>
      <Link
        to="/"
        onClick={() => handleToggleNavItem("dashboard")}
        className={cn(
          "text-white transition-colors hover:text-foreground",
          activeTab === "dashboard"
            ? "text-primary bg-white p-1 rounded-md w-5/6 lg:w-full"
            : ""
        )}
      >
        Dashboard
      </Link>

      <Link
        to="/invoicing"
        onClick={() => handleToggleNavItem("invoicing")}
        className={cn(
          "text-white transition-colors hover:text-foreground",
          activeTab === "invoicing"
            ? "text-primary bg-white p-1 rounded-md w-5/6 lg:w-full "
            : ""
        )}
      >
        Faturamento
      </Link>

      <Link
        to="/form/menu"
        onClick={() => handleToggleNavItem("form/menu")}
        className={cn(
          "text-white transition-colors hover:text-foreground",
          activeTab === "form/menu"
            ? "text-primary bg-white p-1 rounded-md w-5/6 lg:w-full"
            : ""
        )}
      >
        Formulário
      </Link>

      <Link
        to="/list"
        onClick={() => handleToggleNavItem("list")}
        className={cn(
          "text-white transition-colors hover:text-foreground",
          activeTab === "list"
            ? "text-primary bg-white p-1 rounded-md w-5/6 lg:w-full"
            : ""
        )}
      >
        Ocorrências
      </Link>

      <Link
        to="/list-rigs"
        onClick={() => handleToggleNavItem("list-rigs")}
        className={cn(
          "text-white transition-colors hover:text-foreground",
          activeTab === "list-rigs"
            ? "text-primary bg-white p-1 rounded-md w-5/6 lg:w-full"
            : ""
        )}
      >
        Sondas
      </Link>

      <Link
        to="/contracts"
        onClick={() => handleToggleNavItem("contracts")}
        className={cn(
          "text-white transition-colors hover:text-foreground",
          activeTab === "contracts"
            ? "text-primary bg-white p-1 rounded-md w-5/6 lg:w-full"
            : ""
        )}
      >
        Contratos
      </Link>

      <Link
        to="/users"
        onClick={() => handleToggleNavItem("users")}
        className={cn(
          "text-white transition-colors hover:text-foreground",
          activeTab === "users"
            ? "text-primary bg-white p-1 rounded-md w-5/6 lg:w-full"
            : ""
        )}
      >
        Usuários
      </Link>

      <Link
        to="/reports"
        onClick={() => handleToggleNavItem("reports")}
        className={cn(
          "text-white transition-colors hover:text-foreground",
          activeTab === "reports"
            ? "text-primary bg-white p-1 rounded-md w-5/6 lg:w-full"
            : ""
        )}
      >
        Relatórios
      </Link>
    </>
  );
};

export function Navbar() {
  const navigate = useNavigate();
  const { signout } = useAuth();
  return (
    <header className="sticky top-0 flex h-16 z-10 items-center gap-4 border-b bg-primary px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <img
          onClick={() => navigate("/")}
          src={logo}
          width={70}
          height={50}
          alt="logo"
          className="rounded-full cursor-pointer"
        />

        <NavigationLinks />
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <NavigationLinks />
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex  items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 ">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/profile" className=" w-full">
                Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/profile/products" className=" w-full">
                Meus Produtos
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signout()}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
