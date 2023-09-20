import {createContext, useContext, useState} from "react";

interface SidebarContextValues {
  expanded: boolean;
  active: string;
  toggleVisibility(): void;
  handleToggleNavItem(text: string): void;
}

export const SidebarContext = createContext({} as SidebarContextValues);

export const useSidebarContext = () => useContext(SidebarContext);

export const SidebarProvider = ({children}: {children: React.ReactNode}) => {
  const [expanded, setExpanded] = useState(true);
  const [active, setActive] = useState<string>("Dashboard");

  const toggleVisibility = () => {
    setExpanded((prevState) => !prevState);
  };

  const handleToggleNavItem = (text: string) => {
    setActive(text);
  };
  return (
    <SidebarContext.Provider
      value={{expanded, toggleVisibility, handleToggleNavItem, active}}
    >
      {children}
    </SidebarContext.Provider>
  );
};
