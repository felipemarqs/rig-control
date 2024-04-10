import { createContext, useContext, useState } from "react";
interface SidebarContextValues {
  activeTab: SidebarOptions;
  handleToggleNavItem(text: string): void;
}

export type SidebarOptions =
  | "dashboard"
  | "invoicing"
  | "form/menu"
  | "list"
  | "list-rigs"
  | "contracts"
  | "users"
  | "reports";
export const SidebarContext = createContext({} as SidebarContextValues);

export const useSidebarContext = () => useContext(SidebarContext);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeTab, setActiveTab] = useState<SidebarOptions>("dashboard");

  const handleToggleNavItem = (sidebarOption: SidebarOptions) => {
    setActiveTab(sidebarOption);
  };

  return (
    <SidebarContext.Provider
      value={{
        handleToggleNavItem,
        activeTab,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
