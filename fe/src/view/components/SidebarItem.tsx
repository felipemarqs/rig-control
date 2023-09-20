import {ReactNode} from "react";
import {useSidebarContext} from "../../app/contexts/SidebarContext";
import {useNavigate} from "react-router-dom";

interface SidebarItemProps {
  icon: ReactNode; // Tipo definido como ReactNode
  text: string;
  urlText: string;
  isActive?: boolean;
  alert?: boolean; // Opcional
}

export function SidebarItem({
  icon,
  text,
  isActive,
  alert,
  urlText,
}: SidebarItemProps) {
  const {expanded, handleToggleNavItem} = useSidebarContext();

  const navigate = useNavigate();

  const handleOnClick = (text: string) => {
    handleToggleNavItem(text);
    navigate(`/${urlText.toLocaleLowerCase()}`);
  };

  return (
    <li
      onClick={() => handleOnClick(text)}
      className={`
          relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${
            isActive
              ? "bg-gradient-to-tr from-primary-200 to-primary-100 text-primary-800"
              : "hover:bg-primary-50 text-white"
          }
      `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-primary-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-primary-100 text-primary-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
