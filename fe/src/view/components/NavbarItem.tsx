{
  /* <li key={idx} className="text-gray-600 hover:text-indigo-600">
<a href={item.path}>
    { item.title }
</a>
</li> */
}

import {ReactNode} from "react";
import {useSidebarContext} from "../../app/contexts/SidebarContext";
import {useNavigate} from "react-router-dom";

interface SidebarItemProps {
  icon: ReactNode; // Tipo definido como ReactNode
  text: string;
  urlText: string;
  isActive?: boolean;
}

export function NavbarItem({
  icon,
  text,
  isActive,

  urlText,
}: SidebarItemProps) {
  const {handleToggleNavItem} = useSidebarContext();

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
      <span className="ml-2">{text}</span>
    </li>
  );
}
