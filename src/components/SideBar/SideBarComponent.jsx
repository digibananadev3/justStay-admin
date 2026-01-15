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

  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (key) => {
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

 // ✅ Recursive menu renderer
  const renderMenu = (items, parentKey = "") =>
    items.map((item, index) => {
      const key = `${parentKey}${index}`;
      const Icon = item.icon;
      const hasChildren = item.children?.length > 0;
      const isOpen = openMenus[key];

      return (
        <div key={key}>
          {/* Menu Item */}
          <div
            onClick={() => hasChildren && toggleMenu(key)}
            className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition hover:bg-gray-100"
          >
            <div className="flex items-center gap-3">
              {Icon && <Icon className="w-5 h-5" />}
              {hasChildren ? (
                <span>{item.title}</span>
              ) : (
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#0f766e] font-semibold"
                      : "text-gray-800"
                  }
                >
                  {item.title}
                </NavLink>
              )}
            </div>

            {hasChildren && (
              <FaAngleDown
                className={`w-4 h-4 transition ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </div>

          {/* Children */}
          {hasChildren && isOpen && (
            <div className="ml-6 mt-1 flex flex-col gap-1 pl-3">
              {renderMenu(item.children, `${key}-`)}
            </div>
          )}
        </div>
      );
    });

  return (
    <Sidebar className="bg-white border-r shadow-sm flex flex-col">
      {/* Logo */}
      <SidebarItems>
        <div className="w-[256px] px-7">
          <img className="w-[155px] pt-4" src={Logo} alt="logo" />
          <p className="pt-1 pb-6 text-[#6A7282] text-[16px]">
            Admin Portal
          </p>
        </div>
      </SidebarItems>

      {/* Navigation */}
      <SidebarItems className="flex-1">
        <div className="px-4 pb-6">
          <nav className="flex flex-col gap-1">
            {renderMenu(NavBarConfig)}
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