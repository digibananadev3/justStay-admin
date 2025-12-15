import { Drawer, DrawerItems } from "flowbite-react";
import CardComponent from "../components/Cards/CardComponent";
import BookingCardComponent from "../components/Cards/BookingCardComponent";
import { LuDollarSign } from "react-icons/lu";
import { useState } from "react";
import DrawerTitleComponent from "../components/Drawer/DrawerTitleComponent";
import TabComponent from "../components/BasicComponent/TabComponent";
import { TabsList } from "./GuestsTabs/TabsList";

const GuestInformation = ({isOpen, setIsOpen, selectedGuest }) => {
  const handleClose = () => setIsOpen(false);
  return (
    <>
      <Drawer
        open={isOpen}
        onClose={handleClose}
        position="right"
        className="w-7/12 bg-white!"
      >
        <DrawerTitleComponent
          title={`Guest Profile - ${selectedGuest?.guest || 'N/A'}`}
          subTitle={"Complete guest information and activity"}
        />
        <TabComponent tabSection={TabsList} />
      </Drawer>
    </>
  )
}

export default GuestInformation;
