import TableComponent from "../../components/BasicComponent/TableComponent";
import { useEffect, useState } from "react";
import { getAllFoods, deleteFood } from "../../services/food";
import { LuUtensils, LuLayers, LuImage, LuEye } from "react-icons/lu";
import { AiFillDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import FoodFormModal from "./FoodFormModal";
import FoodViewModal from "./FoodViewModal";

const FoodSection = () => {
  const [data, setData] = useState([]);
  const [currentPage, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [viewId, setViewId] = useState(null);


  const pageSize = 10;

  const columns = [
    {
      header: "Food",
      accessor: "title",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-orange-50 text-orange-600 grid place-items-center border border-orange-100">
            <LuUtensils size={16} />
          </div>
          <div>
            <p className="font-poppins font-medium text-[14px] leading-5">
              {value}
            </p>
            <p className="font-poppins text-[12px] leading-4 text-[#6A7282]">
              {row.category}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: "category",
      render: (value) => (
        <span className="px-2 py-1 text-xs rounded-md bg-blue-50 text-blue-600 border border-blue-200">
          {value}
        </span>
      ),
    },
    {
      header: "Stock",
      accessor: "stock",
      render: (value) => (
        <span className="font-poppins text-[14px] font-medium">
          {value}
        </span>
      ),
    },
    {
      header: "Images",
      accessor: "images",
      render: (value) => (
        <div className="flex items-center gap-1">
          <LuImage size={14} />
          <span className="text-sm">{value}</span>
        </div>
      ),
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (_, row) => (
        <div className="flex items-center gap-3 text-gray-500">
<button 
  className="hover:text-blue-600 cursor-pointer"
  onClick={(e) => {
    e.stopPropagation();
    setViewId(row._id);
  }}
>
  <LuEye size={16} />
          </button>
          <button 
          className="hover:text-red-400 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(row._id);
          }}
        >
          <AiFillDelete className="text-lg" />
        </button>
        </div>
      ),
    },
  ];

  const loadFoods = async () => {
    try {
      const res = await getAllFoods();
      const mapped = res.data.map((f) => ({
        _id: f._id,
        title: f.title,
        category: f.category,
        stock: f.totalStock,
        images: f.images.length,
      }));
      setData(mapped);
    } catch (err) {
      toast.error("Failed to load foods");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this food item?")) return;
    try {
      await deleteFood(id);
      toast.success("Food deleted");
      loadFoods();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    loadFoods();
  }, []);

  return (
    <>
      <div className="py-4">
        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create Food
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

      <FoodFormModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={loadFoods}
      />

      <FoodViewModal
  isOpen={!!viewId}
  foodId={viewId}
  onClose={() => setViewId(null)}
/>

    </>
  );
};

export default FoodSection;
