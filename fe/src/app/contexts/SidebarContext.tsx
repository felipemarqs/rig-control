import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {useWindowWidth} from "../utils/useWindowWidth";

interface SidebarContextValues {
  expanded: boolean;
  active: string;
  toggleVisibility(): void;
  toggleHiddenVisibility(): void;
  handleToggleNavItem(text: string): void;
  windowWidth: number;
  hidden: boolean;
}

export const SidebarContext = createContext({} as SidebarContextValues);

export const useSidebarContext = () => useContext(SidebarContext);

export const SidebarProvider = ({children}: {children: React.ReactNode}) => {
  const [expanded, setExpanded] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string>("Dashboard");

  const windowWidth = useWindowWidth();

  const toggleVisibility = () => {
    setExpanded((prevState) => !prevState);
  };

  const toggleHiddenVisibility = useCallback(() => {
    setHidden((prevState) => !prevState);
  }, []);
  const handleToggleNavItem = (text: string) => {
    setActive(text);
  };

  useEffect(() => {
    if (windowWidth > 1300) {
      toggleHiddenVisibility();
    }
  }, [toggleHiddenVisibility, windowWidth]);
  return (
    <SidebarContext.Provider
      value={{
        expanded,
        toggleVisibility,
        handleToggleNavItem,
        active,
        windowWidth,
        toggleHiddenVisibility,
        hidden,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
