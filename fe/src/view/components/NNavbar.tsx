import {useEffect, useState} from "react";

import whiteLogo from "../../assets/images/white-logo.png";

import {
  BarChart3,
  LayoutDashboard,
  UserCircle,
  FileText,
  CircleDollarSignIcon,
  ArchiveX,
  Building2,
  Construction,
  StickyNote,
  BarChartBig,
  Receipt,
  LineChart,
} from "lucide-react";

import {Link} from "react-router-dom";

interface DropdownState {
  isActive: boolean;
  idx: number | null;
}

const dropdownDashboard = [
  {
    label: "Dashboards",
    navs: [
      {
        title: "Dashboard",
        desc: "Estatísticas específicas da sonda",
        path: "/dashboard",
        icon: <BarChartBig />,
      },
      {
        title: "Dashboard Geral",
        desc: "Estatísticas gerais da sonda",
        path: "/global-dashboard",
        icon: <LayoutDashboard />,
      },
    ],
  },
];

const dropdownBilling = [
  {
    label: "Faturamento",
    navs: [
      {
        title: "Faturamento",
        desc: "Veja os detalhes do faturamento específico.",
        path: "/invoicing-list",
        icon: <CircleDollarSignIcon />,
      },
      {
        title: "Faturamento Geral",
        desc: "Acesse informações de faturamento abrangentes.",
        path: "/invoicing-dashboard",
        icon: <Receipt />,
      },
    ],
  },
];

export const NNavBar = () => {
  const [state, setState] = useState(false);
  const [drapdownState, setDrapdownState] = useState<DropdownState>({
    isActive: false,
    idx: null,
  });

  // Replace javascript:void(0) paths with your paths
  const navigation = [
    {
      title: "Dashboard",
      path: "javascript:void(0)",
      isDrapdown: true,
      navs: dropdownDashboard,
    },
    {
      title: "Faturamento",
      path: "javascript:void(0)",
      isDrapdown: true,
      navs: dropdownBilling,
    },
    {title: "Formulário", path: "/form", isDrapdown: false},
    {title: "Usuários", path: "/users", isDrapdown: false},
    {title: "Sondas", path: "/list-rigs", isDrapdown: false},
    {title: "Relatórios", path: "/reports", isDrapdown: false},
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".nav-menu")) {
        setDrapdownState({isActive: false, idx: null});
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav
        className={`relative z-20 bg-primary-500 text-white w-full md:static md:text-sm md:border-none ${
          state ? "shadow-lg rounded-b-xl md:shadow-none" : ""
        }`}
      >
        <div className="items-center gap-x-14 px-4 max-w-screen-xl mx-auto md:flex md:px-8">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link to="/" className="">
              <img src={whiteLogo} className="w-24" alt="" />
            </Link>
            <div className="md:hidden">
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setState(!state)}
              >
                {state ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div
            className={`nav-menu flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              state ? "block" : "hidden"
            }`}
          >
            <ul className="items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
              {navigation.map((item, idx) => {
                return (
                  <li key={idx}>
                    {item.isDrapdown ? (
                      <button
                        className="w-full flex items-center justify-between gap-1 text-white hover:text-primary-600"
                        onClick={() =>
                          setDrapdownState({
                            idx,
                            isActive: !drapdownState.isActive,
                          })
                        }
                      >
                        {item.title}
                        {drapdownState.idx == idx && drapdownState.isActive ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                    ) : (
                      <Link
                        to={item.path}
                        className="block text-white hover:text-primary-600"
                      >
                        {item.title}
                      </Link>
                    )}
                    {item.isDrapdown &&
                    drapdownState.idx == idx &&
                    item &&
                    drapdownState.isActive ? (
                      <div className="mt-6 inset-x-0 bg-white top-20 w-full z-50 md:absolute md:border-y md:shadow-md md:mt-0">
                        <ul className="max-w-screen-xl mx-auto grid items-center gap-6 md:p-8 md:grid-cols-2 lg:grid-cols-3">
                          {item?.navs?.map((dropdownItem, idx) => (
                            <li key={idx}>
                              <p className="text-primary-600 text-sm">
                                {dropdownItem.label}
                              </p>
                              <ul className="mt-5 space-y-6">
                                {dropdownItem.navs.map((navItem, idx) => (
                                  <li key={idx} className="group">
                                    <Link
                                      to={navItem.path}
                                      className="flex gap-3 items-center "
                                    >
                                      <div className=" rounded-full  bg-primary-200 text-primary-600 flex items-center justify-center duration-150 group-hover:bg-primary-600 group-hover:text-white md:w-14 md:h-14">
                                        {navItem.icon}
                                      </div>
                                      <div>
                                        <span className="text-gray-800 duration-200 group-hover:text-primary-600 text-sm font-medium md:text-base">
                                          {navItem.title}
                                        </span>
                                        <p className="text-sm text-gray-600 group-hover:text-gray-800 mt-1">
                                          {navItem.desc}
                                        </p>
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}
                  </li>
                );
              })}
              <div className="flex-1 items-center justify-end gap-x-6 space-y-3 md:flex md:space-y-0">
                <li>
                  <a
                    href="javascript:void(0)"
                    className="block py-3 text-center text-white hover:text-primary-600 border rounded-lg md:border-none"
                  >
                    Log in
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="block py-3 px-4 font-medium text-center text-white bg-primary-600 hover:bg-primary-500 active:bg-primary-700 active:shadow-none rounded-lg shadow md:inline"
                  >
                    Sign in
                  </a>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
      {state ? (
        <div
          className="z-10 fixed top-0 w-screen h-screen bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setState(false)}
        ></div>
      ) : (
        ""
      )}
    </>
  );
};
