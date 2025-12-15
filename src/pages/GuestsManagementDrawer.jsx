import GuestInformation from "./GuestsInformation"

const GuestManagementDrawer = ({isOpen, setIsOpen, selectedGuest}) => {
  return(
    <>
      <GuestInformation 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedGuest={selectedGuest}
      />
    </>
  )
}

export default GuestManagementDrawer