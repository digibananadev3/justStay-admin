import { Drawer } from "flowbite-react";
import DrawerTitleComponent from "../../components/Drawer/DrawerTitleComponent";
import GuestInformation from "./Drawer/GuestInformation";
import SubmittedDoc from "./Drawer/SubmittedDoc";
import VerificationAlert from "./Drawer/VerificationAlert";
import VerificationOverride from "./Drawer/VerificationOverride";

const GuestVerificationDrawer = ({ isOpen, setIsOpen }) => {
  const handleClose = () => setIsOpen(false);
  return(
    <>
      <Drawer
        open={isOpen}
        onClose={handleClose}
        position="right"
        className="w-1/2 bg-white!"
      >
        <DrawerTitleComponent
          title={"Guest KYC Verification - Rahul Sharma"}
          subTitle={"Review and manage guest verification documents"}
        />

        <div>
          <GuestInformation />
        </div>

        <div>
          <SubmittedDoc />
        </div>
        <div>
          <VerificationAlert />
        </div>
        <div>
          <VerificationOverride />
        </div>
      </Drawer>
    </>
  )
}

export default GuestVerificationDrawer