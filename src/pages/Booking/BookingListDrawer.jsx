import { Drawer } from "flowbite-react"
import DrawerTitleComponent from "../../components/Drawer/DrawerTitleComponent"
import BookingMetaPills from "./BookingMetaPill";
import BookingGuestInformation from "./BookingGuestInformation";
import StayDetails from "./StayDetails";
import PaymentInformation from "./PaymentInformation";
import RequestAndAction from "./RequestAndAction";
import AdminAction from "./AdminAction";
import { useState } from "react";

const BookingListDrawer = ({ isOpen, setIsOpen }) => {
  const [note, setNote] = useState("");
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
          title={"Booking Details - BK003"}
          subTitle={"Complete booking information and management actions"}
        />
        <div>
          <BookingMetaPills hours={6} />
        </div>

        <div className="mt-6">
          <BookingGuestInformation />
        </div>

        <div className="mt-6">
          <StayDetails />
        </div>

        <div className="mt-6">
          <PaymentInformation
            pricing={{ base: 2500, discount: 250, taxes: 202, platform: 75 }}
            payment={{ status: "paid", method: "Debit Card", transactionId: "TXN001234569" }}
          />
        </div>

        <div className="mt-6">
          <RequestAndAction
            requests={["Late checkout request"]}
            note={note}
            onNoteChange={setNote}
          />
          <hr className="my-6 border-gray-200" />
        </div>
        <div className="mt-6">
         <AdminAction
            onModify={() => console.log("Modify")}
            onCancel={() => console.log("Cancel")}
            onManualCheckIn={() => console.log("Manual Check-in")}
            onResend={() => console.log("Resend")}
            onDownloadVoucher={() => console.log("Download Voucher")}
            onContactGuest={() => console.log("Contact Guest")}
          />
        </div>
      </Drawer>
    
    </>
  )
}

export default BookingListDrawer