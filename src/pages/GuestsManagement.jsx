import { LuEye } from 'react-icons/lu';
import { FaRegEdit } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import TableComponent from "../components/BasicComponent/TableComponent";
import CardComponent from "../components/Cards/CardComponent"
import GuestFilters from "../components/GuestFilters/GuestFilters"
import PageHeading from "../components/PageHeading/PageHeading"
import { cardConstant } from "../utils/Constant/GuestManagementConstant"
import GuestManagementDrawer from './GuestsManagementDrawer';
import { useEffect, useState } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { handleGuestUserList, fetchStats } from '../services/guestUser';
import Loader from '../components/BasicComponent/Loader';
import { useDispatch } from 'react-redux';
import { setGuestId } from '../redux/slices/guestSlice';

const columns = [
  { header: "Guest", accessor: "guest", meta: "user_id" },
  { header: "Contact", accessor: "contact", meta: "contact_no" },
  { header: "Location", accessor: "location", meta: "state" },
  { header: "Status", accessor: "status", render: (value) => (
      <span
        className={`px-3 py-1 text-xs rounded-full font-medium ${
          value === "Active"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-600"
        }`}
      >
        {value}
      </span>
    ) 
  },
  { header: "KYC", accessor: "kyc", render: (value) => (
      <span
        className={`px-3 py-1 text-xs rounded-full font-medium ${
          value === "Verified"
            ? "bg-green-100 text-green-700"
            : value === "Pending"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-600"
        }`}
      >
        {value}
      </span>
    )
  },
  { header: "Wallet", accessor: "wallet", meta: "earned" },
  { header: "Bookings", accessor: "bookings", meta: "spent" },
  { header: "Actions", accessor: "actions", render: () => (
      <div className="flex items-center gap-2 text-gray-500">
        <button className="hover:text-blue-600 cursor-pointer" onClick={(e) => e.stopPropagation()}>
          <LuEye />
        </button>
        <button className="hover:text-blue-600 cursor-pointer" onClick={(e) => e.stopPropagation()}>
          <FaRegEdit />
        </button>
        <button className="hover:text-blue-600 cursor-pointer" onClick={(e) => e.stopPropagation()}>
          <BsThreeDots />
        </button>
      </div>
    )
  },
];

const GuestsManagement = () => {
  const [guestList, setGuestList] = useState([])
  const [selectedGuest, setSelectedGuest] = useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()
  const [guestListFetch, guestStats] = useQueries({
    queries:[
      {
        queryKey: ["guestListFetch"],
        queryFn: handleGuestUserList
      },
      {
        queryKey: ["guestStats"],
        queryFn: fetchStats
      }
    ]
  })

  useEffect(()=> {
    if(guestListFetch?.data?.data) {
      const data = guestListFetch?.data?.data?.map((item) => ({
        guest: item?.firstName + " " + item?.lastName,
        user_id: item?._id,
        contact: item?.email,
        contact_no: item?.phone,
        location: item?.city,
        state: item?.state,
        status: item?.status,
        kyc: item?.kyc,
        wallet: item?.wallet,
        earned: item?.earned,
        bookings: item?.bookings,
        spent: item?.spent
      }))
      setGuestList(data)
    }

  }, [guestListFetch?.isLoading])

  if( guestListFetch?.isLoading || guestStats.isLoading ) return <Loader />
  return(
    <>
      <div>
        <PageHeading
          title={"Guests Management"}
          subTitle={"Manage guest accounts"}
        />
      </div>
      <div className="flex gap-4 pt-8">
        {
          cardConstant.map((item) => (
            <CardComponent
              key={item.title}
              title={item.title}
              totalNumber={guestStats?.data?.data[item.access]}
              borderColor={item.borderColor}
              bgColor={item.bgColor}
              fontTitleColor={item.fontTitleColor}
            />
          ))
        }
      </div>
      <div className="my-6 border border-gray-200 rounded-2xl">
        <div className="p-6">
          <GuestFilters
            updateGuestList={setGuestList}
          />
        </div>
      </div>
      <div>
        <TableComponent columns={columns} data={guestList} onRowClick={(guest) => 
          {
            dispatch(setGuestId(guest?.user_id))
            setSelectedGuest(guest);
            setIsOpen(true);
          }} />
        <GuestManagementDrawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedGuest={selectedGuest}
        />
      </div>
    </>
  )
}

export default GuestsManagement