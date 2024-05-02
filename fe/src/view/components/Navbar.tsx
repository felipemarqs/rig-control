import {ChevronDown, CircleUser, Menu} from "lucide-react";

import {Button} from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {useNavigate, Link} from "react-router-dom";

import logo from "@/assets/images/white-logo.png";
import avatarIcon from "@/assets/icons/avatar.svg";

import {useAuth} from "@/app/hooks/useAuth";
import {useSidebarContext} from "@/app/contexts/SidebarContext";
import {cn} from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

interface NavigationLinksProps {
  isUserAdm: boolean;
}

const NavigationLinks = ({isUserAdm}: NavigationLinksProps) => {
  const {activeTab, handleToggleNavItem} = useSidebarContext();

  return (
    <>
      <HoverCard openDelay={0}>
        <HoverCardTrigger>
          {" "}
          <span
            className={cn(
              "text-left text-gray-500 transition-colors flex items-center gap-2 hover:text-white",
              activeTab === "dashboard" ? "text-white " : ""
            )}
          >
            {" "}
            Dashboard <ChevronDown />
          </span>
        </HoverCardTrigger>
        <HoverCardContent>
          <Link
            className={cn(
              "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            )}
            to="/dashboard"
            onClick={() => handleToggleNavItem("dashboard")}
          >
            Dashboard por Sonda
          </Link>

          <Link
            className={cn(
              "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            )}
            to="/global-dashboard"
            onClick={() => handleToggleNavItem("dashboard")}
          >
            Dashboard Geral
          </Link>
        </HoverCardContent>
      </HoverCard>

      {isUserAdm && (
        <HoverCard openDelay={0}>
          <HoverCardTrigger>
            {" "}
            <span
              className={cn(
                "text-left text-gray-500 transition-colors flex items-center gap-2 hover:text-white",
                activeTab === "invoicing" ? "text-white " : ""
              )}
            >
              {" "}
              Faturamento <ChevronDown />
            </span>
          </HoverCardTrigger>
          <HoverCardContent>
            <Link
              className={cn(
                "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              )}
              to="/invoicing-dashboard"
              onClick={() => handleToggleNavItem("invoicing")}
            >
              Faturamento Geral
            </Link>{" "}
            <Link
              className={cn(
                "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              )}
              to="/invoicing-rig-dashboard"
              onClick={() => handleToggleNavItem("invoicing")}
            >
              Faturamento por Sonda
            </Link>
          </HoverCardContent>
        </HoverCard>
      )}

      <Link
        to="/form/menu"
        onClick={() => handleToggleNavItem("form/menu")}
        className={cn(
          "text-gray-500 transition-colors hover:text-white",
          activeTab === "form/menu" ? "text-white " : ""
        )}
      >
        Formulário
      </Link>

      <Link
        to="/list"
        onClick={() => handleToggleNavItem("list")}
        className={cn(
          "text-gray-500 transition-colors hover:text-white",
          activeTab === "list" ? "text-white " : ""
        )}
      >
        Ocorrências
      </Link>

      {isUserAdm && (
        <>
          <Link
            to="/list-rigs"
            onClick={() => handleToggleNavItem("list-rigs")}
            className={cn(
              "text-gray-500 transition-colors hover:text-white",
              activeTab === "list-rigs" ? "text-white " : ""
            )}
          >
            Sondas
          </Link>

          <Link
            to="/contracts"
            onClick={() => handleToggleNavItem("contracts")}
            className={cn(
              "text-gray-500 transition-colors hover:text-white",
              activeTab === "contracts" ? "text-white " : ""
            )}
          >
            Contratos
          </Link>

          <Link
            to="/users"
            onClick={() => handleToggleNavItem("users")}
            className={cn(
              "text-gray-500 transition-colors hover:text-white",
              activeTab === "users" ? "text-white " : ""
            )}
          >
            Usuários
          </Link>
        </>
      )}

      <Link
        to="/reports"
        onClick={() => handleToggleNavItem("reports")}
        className={cn(
          "text-gray-500 transition-colors hover:text-white",
          activeTab === "reports" ? "text-white " : ""
        )}
      >
        Relatórios
      </Link>
    </>
  );
};

export function Navbar() {
  const navigate = useNavigate();
  const {signout, isUserAdm, user} = useAuth();
  return (
    <header className="sticky top-0 flex h-24 z-10 items-center gap-4 border-b bg-primary px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 ">
        <img
          onClick={() => navigate("/")}
          src={logo}
          width={70}
          height={50}
          alt="logo"
          className="rounded-full cursor-pointer"
        />

        <div className="ml-12 flex gap-8">
          <NavigationLinks isUserAdm={isUserAdm} />
        </div>
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
            <NavigationLinks isUserAdm={isUserAdm} />
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex  items-center gap-4 w-full md:justify-end md:gap-2 lg:gap-4 ">
        <div className="flex items-center gap-4">
          {user && (
            <span className="hidden md:inline text-white"> {user?.name}</span>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src={avatarIcon} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => signout()}>
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
