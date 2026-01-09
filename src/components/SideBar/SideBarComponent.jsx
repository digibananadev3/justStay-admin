import React, { useState } from "react";
import { Sidebar, SidebarItems } from "flowbite-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { NavBarConfig } from "../../utils/NavBar";
import Logo from "../../assets/logo.svg";
// import { ChevronDown } from "lucide-react";
import { FaAngleDown } from "react-icons/fa6";

const SideBarComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Sidebar className="bg-white border-r shadow-sm flex flex-col">
      {/* Logo */}
      <SidebarItems>
        <div className="w-[256px] px-7">
          <img className="w-[155px] pt-4" src={Logo} alt="logo" />
          <p className="pt-1 pb-6 text-[#6A7282] text-[16px]">Admin Portal</p>
        </div>
      </SidebarItems>

      {/* Navigation */}
      <SidebarItems className="flex-1">
        <div className="px-4 pb-6">
          <nav className="flex flex-col gap-1">
            {NavBarConfig.map((config) => {
              const Icon = config.icon;
              const hasChildren = config.children?.length > 0;
              const isOpen = openMenu === config.title;

              return (
                <div key={config.title}>
                  {/* Parent */}
                  <NavLink
                    to={config.url}
                    onClick={() =>
                      hasChildren
                        ? setOpenMenu(isOpen ? null : config.title)
                        : null
                    }
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition ${
                        isActive
                          ? "bg-[#E9F7F8] border border-[#96F7E4] text-[#0f766e]"
                          : "text-gray-800 hover:bg-gray-100"
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      {Icon && <Icon className="w-5 h-5" />}
                      <span>{config.title}</span>
                    </div>

                    {hasChildren && (
                      <FaAngleDown
                        className={`w-4 h-4 transition ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </NavLink>

                  {/* Dropdown */}
                  {hasChildren && isOpen && (
                    <div className="ml-8 mt-1 flex flex-col gap-1">
                      {config.children.map((child) => (
                        <NavLink
                          key={child.title}
                          to={child.url}
                          className={({ isActive }) =>
                            `px-3 py-2 text-sm rounded-lg transition ${
                              isActive
                                ? "bg-blue-50 text-blue-700 font-semibold"
                                : "text-gray-600 hover:bg-gray-100"
                            }`
                          }
                        >
                          {child.title}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </SidebarItems>

      {/* Logout */}
      <SidebarItems>
        <div className="px-4 pb-6 border-t pt-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full"
          >
            Logout
          </button>
        </div>
      </SidebarItems>
    </Sidebar>
  );
};

export default SideBarComponent;
