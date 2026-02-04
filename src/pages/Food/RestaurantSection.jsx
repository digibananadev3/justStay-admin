import TableComponent from "../../components/BasicComponent/TableComponent";
import { useEffect, useState } from "react";
import { getAllRestaurants, deleteRestaurant  } from "../../services/food";
import { LuHotel, LuMapPin, LuPhone, LuStar, LuEye } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { createPortal } from "react-dom";
import RestaurantFormModal from "./RestaurantFormModal";
import toast from "react-hot-toast";
// import RestaurantFormModal from "../../components/RestaurantFormModal";





const RestaurantSection = () => {
  const [data, setData] = useState([]);
const [currentPage, setPage] = useState(1);
const [openModal, setOpenModal] = useState(false);

const pageSize = 10;


      const columns = [
        {
          header: "Restaurant",
          accessor: "hotel",
          render: (value, row) => (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-teal-50 text-teal-600 grid place-items-center border border-teal-100">
                <LuHotel size={16} />
              </div>
              <div>
                <p className="font-poppins font-medium text-[14px] leading-5">
                  {value}
                </p>
                <p className="font-poppins text-[12px] leading-4 text-[#6A7282]">
                  {row.hotelMeta}
                </p>
              </div>
            </div>
          ),
        },
        {
          header: "Location",
          accessor: "city",
          render: (value, row) => (
            <div className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                <LuMapPin size={14} />
              </span>
              <div>
                <p className="font-poppins font-medium text-[14px] leading-5">
                  {value}
                </p>
                <p className="font-poppins text-[12px] leading-4 text-[#6A7282]">
                  {row.state}
                </p>
              </div>
            </div>
          ),
        },
        {
          header: "Name",
          accessor: "owner",
          render: (value, row) => (
            <div>
              <p className="font-poppins font-medium text-[14px] leading-5">
                {value}
              </p>
              <p className="font-poppins text-[12px] leading-4 text-[#6A7282] inline-flex items-center gap-1">
                <LuPhone size={12} className="text-gray-500" />
                {row.phone}
              </p>
            </div>
          ),
        },
        // {
        //   header: "Rooms",
        //   accessor: "rooms",
        //   render: (value, row) => (
        //     <div>
        //       <p className="font-poppins font-medium text-[14px] leading-5">
        //         {value} Rooms
        //       </p>
        //       <p className="font-poppins text-[12px] leading-4 text-[#6A7282]">
        //         {row.occupancy}% Occupied
        //       </p>
        //     </div>
        //   ),
        // },
        {
          header: "Status",
          accessor: "status",
          render: (value, row) => (
            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-1 text-[12px] rounded-full border ${
                  value === "Active"
                    ? "bg-green-100 text-green-700 border-[#B9F8CF]"
                    : "bg-yellow-50 text-amber-700 border-amber-200"
                }`}
              >
                {value}
              </span>
              <span
                className={`px-2.5 py-1 text-[12px] rounded-full border ${
                  row.kyc === "Verified"
                    ? "bg-green-100 text-green-700 border-[#B9F8CF]"
                    : "bg-red-50 text-red-700 border-red-200"
                }`}
              >
                {row.kyc}
              </span>
            </div>
          ),
        },
        // {
        //   header: "Rating",
        //   accessor: "rating",
        //   render: (value, row) => (
        //     <div>
        //       <p className="font-poppins font-medium text-[14px] leading-5 inline-flex items-center gap-1">
        //         <span className="text-amber-500">
        //           <LuStar size={14} />
        //         </span>
        //         {value}
        //       </p>
        //       <p className="font-poppins text-[12px] leading-4 text-[#6A7282]">
        //         {row.reviews} reviews
        //       </p>
        //     </div>
        //   ),
        // },
        // {
        //   header: "Features",
        //   accessor: "features",
        //   render: (_, row) => (
        //     <div className="flex items-center gap-2">
        //       {row.features?.length > 0 ? (
        //         row.features.map((f) => (
        //           <span
        //             key={f}
        //             className={`px-2 py-1 text-[12px] rounded-lg border ${
        //               f === "Hourly"
        //                 ? "bg-blue-50 text-blue-700 border-blue-200"
        //                 : "bg-green-50 text-emerald-700 border-emerald-200"
        //             }`}
        //           >
        //             {f}
        //           </span>
        //         ))
        //       ) : (
        //         <span className="text-gray-400 text-[12px]">-</span>
        //       )}
        //     </div>
        //   ),
        // },
        // {
        //   header: "Performance",
        //   accessor: "bookings",
        //   render: (value, row) => (
        //     <div>
        //       <p className="font-poppins font-medium text-[14px] leading-5">
        //         {value} Bookings
        //       </p>
        //       <p className="font-poppins text-[12px] leading-4 text-[#6A7282]">
        //         {row.revenue}
        //       </p>
        //     </div>
        //   ),
        // },
        {
          header: "Actions",
          accessor: "actions",
          render: (value, row) => (
            <div className="flex items-center gap-3 text-gray-500">
              {/* <button
                className="hover:text-blue-600 cursor-pointer"
                aria-label="View"
                onClick={(e) => {
                  setEditPropertyId(row?._id);
                  setIsOpen(!isOpen);
                }}
              >
                <LuEye size={16} />
              </button>
              <button
                className="hover:text-blue-600 cursor-pointer"
                aria-label="Edit"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditPropertyId(row?._id);
                  setIsEditOpen(true);
                }}
              >
                <FaRegEdit size={16} />
              </button> */}
              {/* <button
                className="h-8 w-8 rounded-lg hover:bg-gray-100 transition grid place-items-center cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
    
                  const rect = e.currentTarget.getBoundingClientRect();
    
                  setMenu({
                    id: row._id,
                    rect,
                  });
                }}
              >
                <BsThreeDots size={16} />
              </button> */}
    
    <button
  className="hover:text-red-400 cursor-pointer"
  aria-label="Delete"
  onClick={(e) => {
    e.stopPropagation();
    handleDelete(row?._id);
  }}
>
  <AiFillDelete className="text-lg" />
</button>

    
              {/* Dropdown menu */}
              {/* {menu.id &&
                createPortal(
                  <div
                    className="absolute z-[9999] w-44 rounded-xl border border-gray-200 bg-white
                     shadow-[0_8px_24px_rgba(0,0,0,0.08)] cursor-pointer"
                    style={{
                      top: menu.rect.bottom + window.scrollY + 6,
                      left: menu.rect.left + window.scrollX - 140,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm
                       text-red-600 hover:bg-red-50 transition"
                      onClick={() => {
                        setMenu({ id: null, rect: null });
                        setDeletePropertyId(menu.id);
                        setDeleteModalOpen(true);
                      }}
                    >
                      <MdDelete className="text-lg text-gray-600 cursor-pointer" />
                      <span className="font-poppins font-medium text-gray-600">
                        Delete Hotel
                      </span>
                    </button>
                  </div>,
                  document.body
                )} */}
            </div>
          ),
        },
      ];

      const loadRestaurants = async () => {
  const res = await getAllRestaurants();
  const mapped = res.data.map((r) => ({
    _id: r._id,
    hotel: r.name,
    hotelMeta: r.email,
    city: r.location,
    state: "India",
    owner: r.name,
    phone: r.contactNumber,
    status: r.status === "active" ? "Active" : "Inactive",
    kyc: "Verified",
    bookings: 0,
    revenue: "₹0",
  }));
  setData(mapped);
};


const handleDelete = async (id) => {
  if (!id) return;

  if (!window.confirm("Are you sure you want to delete this restaurant?")) return;

  try {
    await deleteRestaurant(id);
    toast.success("Restaurant deleted successfully");
    loadRestaurants();
  } catch (err) {
    console.error(err);
    toast.error(err?.response?.data?.message || "Delete failed");
  }
};



useEffect(() => {
  loadRestaurants();
}, []);


//       useEffect(() => {
//   const load = async () => {
//     try {
//       const res = await getAllRestaurants();

//       console.log("This is the value of the res:", res);

//       const mapped = res.data.map((r) => ({
//         _id: r._id,

//         // table columns
//         hotel: r.name,
//         hotelMeta: r.email,

//         city: r.location,
//         state: "India",

//         owner: r.name, // you can change later
//         phone: r.contactNumber,

//         rooms: 0,
//         occupancy: 0,

//         status: r.status === "active" ? "Active" : "Inactive",
//         kyc: "Verified",

//         rating: 0,
//         reviews: 0,

//         features: [],
//         bookings: 0,
//         revenue: "₹0",
//       }));

//       setData(mapped);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   load();
// }, []);




  return (
    <>
        <div className="py-4">
           <button
  onClick={() => setOpenModal(true)}
  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
>
  Create Restaurant
</button>

                  <div className="py-8">
         <TableComponent
  columns={columns}
  data={data}
  currentPage={currentPage}
  pageSize={pageSize}
  totalItems={data.length}
  onPageChange={(newPage) => setPage(newPage)}
  onRowClick={(row) => console.log("Row:", row)}
 />
                  </div>
        </div>


        <RestaurantFormModal
  isOpen={openModal}
  onClose={() => setOpenModal(false)}
  onSuccess={loadRestaurants}
/>

    </>
  )
}

export default RestaurantSection;