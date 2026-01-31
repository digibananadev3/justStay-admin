import { Outlet } from "react-router-dom"
import SideBarComponent from "../components/SideBar/SideBarComponent";
import ChatLauncher from "../components/Chat/ChatLauncher";

const MainLayout = () => {
  return(
    <>
      <div className="flex h-screen">
        <div className="h-full">
          <SideBarComponent />
        </div>
        <div className="flex-1 overflow-y-auto">
          <Outlet />

          
          {/* Floating chat icon */}
          <ChatLauncher />
        </div>
      </div>
    </>
  )
}

export default MainLayout