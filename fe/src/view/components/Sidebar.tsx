import {MoreVertical, ChevronLast, ChevronFirst} from "lucide-react";
import React from "react";
import whiteLogo from "../../assets/images/white-logo.png";
import {useSidebarContext} from "../../app/contexts/SidebarContext";
import {useAuth} from "../../app/hooks/useAuth";

export default function Sidebar({children}: {children: React.ReactNode}) {
  const {expanded, toggleVisibility} = useSidebarContext();
  const {signout, user} = useAuth();

  return (
    <aside className="h-screen">
      <nav className="h-full  flex flex-col bg-primary-500 border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={whiteLogo}
            className={`overflow-hidden transition-all ${
              expanded ? "w-24" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => toggleVisibility()}
            className="p-1.5 rounded-lg bg-primary-500 text-white hover:bg-primary-300"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <ul className="flex-1 px-3">{children}</ul>

        <div className="border-t flex justify-between items-center p-3">
          <div
            className={`
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="text-white font-semibold">{user?.name}</h4>
              <span className="text-xs  text-white">
                {user?.rigs[0].rig.name}
              </span>
            </div>
          </div>

          <button onClick={() => signout()}>
            <MoreVertical size={20} />
          </button>
        </div>
      </nav>
    </aside>
  );
}
