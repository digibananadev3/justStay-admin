import { Drawer } from "flowbite-react";
import HotelInformation from "./Drawer/HotelInformation";
import DrawerTitleComponent from "../../components/Drawer/DrawerTitleComponent";
import HotelDocument from "./Drawer/HotelDocument";
import ListingDetail from "./Drawer/ListingDetail";
import BadgeManagement from "./Drawer/BadgeManagement";
import VerificationAlert from "./Drawer/VerificationAlert";
import HotelOverrride from "./Drawer/HotelOverrride";

const HotelVerificationDrawer = ({ isOpen, setIsOpen }) => {
  const handleClose = () => setIsOpen(false);
  return (
    <>
      <Drawer
        open={isOpen}
        onClose={handleClose}
        position="right"
        className="w-1/2 bg-white!"
      >
        <DrawerTitleComponent
          title={"Hotel Verification - Hotel Comfort Inn"}
          subTitle={"Review and manage hotel verification documents and listings"}
        />

        <div>
          <HotelInformation />
        </div>

        <div className="mt-6">
          <HotelDocument />
        </div>

        <div className="mt-6">
          <ListingDetail />
        </div>

        <div className="mt-6">
          <BadgeManagement />
        </div>

        <div className="mt-6">
          <VerificationAlert />
        </div>
        
        <div className="mt-6">
          <HotelOverrride />
        </div>
      </Drawer>
    </>
  )
}

export default HotelVerificationDrawer;