import { useEffect, useState } from "react";
import {
  getAllRestaurants,
  getAllFoods,
  assignFoodToRestaurant,
  getRestaurantFoods,
  removeRestaurantFood
} from "../../services/food";
import toast from "react-hot-toast";
import TableComponent from "../../components/BasicComponent/TableComponent";
import { AiFillDelete } from "react-icons/ai";
import { LuEye } from "react-icons/lu";

const PropertyFoodSection = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [foods, setFoods] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");
  const [stockData, setStockData] = useState([]);

  const [form, setForm] = useState({
    foodId: "",
    availableStock: "",
    price: ""
  });

  const propertyId = "696f6228c88570b8a07fd5be";

  useEffect(() => {
    loadBase();
  }, []);

  const loadBase = async () => {
    try {
      const r = await getAllRestaurants();
      const f = await getAllFoods();

      setRestaurants(r.data);
      setFoods(f.data);

      // ✅ AUTO SELECT FIRST RESTAURANT
      if (r.data.length > 0) {
        const firstId = r.data[r?.data?.length-1]._id;
        setRestaurantId(firstId);
        loadRestaurantStock(firstId);
      }
    } catch (err) {
      toast.error("Failed to load base data");
    }
  };

  const loadRestaurantStock = async (id) => {
    try {
      const res = await getRestaurantFoods(id);
      setStockData(res);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load stock");
    }
  };

  const handleAssign = async () => {
    if (!form.foodId || !form.availableStock || !form.price) {
      return toast.error("Fill all fields");
    }

    try {
      await assignFoodToRestaurant({
        propertyId,
        restaurantId,
        foodId: form.foodId,
        availableStock: Number(form.availableStock),
        price: Number(form.price)
      });

      toast.success("Food assigned");
      setForm({ foodId: "", availableStock: "", price: "" });
      loadRestaurantStock(restaurantId);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Assign failed");
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm("Remove this food?")) return;
    await removeRestaurantFood(id);
    toast.success("Removed");
    loadRestaurantStock(restaurantId);
  };

  const columns = [
    { header: "Food", accessor: "food" },
    { header: "Price", accessor: "price" },
    { header: "Stock", accessor: "availableStock" },
    {
      header: "Actions",
      render: (_, row) => (
        <div className="flex items-center gap-3 text-gray-500">
            {/* <button
                className="hover:text-blue-600 cursor-pointer"
                aria-label="View"
                // onClick={(e) => {
                //   setEditPropertyId(row?._id);
                //   setIsOpen(!isOpen);
                // }}
            >
                <LuEye size={16} />
            </button> */}
            <button
                className="hover:text-red-400 cursor-pointer"
                onClick={() => handleRemove(row._id)}
            >
                <AiFillDelete className="text-lg" />
            </button>
        </div>
      )
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Assign Food to Restaurant
      </h2>

      {/* SELECT RESTAURANT */}
      <select
        className="border p-2 rounded w-64"
        value={restaurantId}
        onChange={(e) => {
          setRestaurantId(e.target.value);
          loadRestaurantStock(e.target.value);
        }}
      >
        {restaurants.map((r) => (
          <option key={r._id} value={r._id}>
            {r.name}
          </option>
        ))}
      </select>

      {/* ASSIGN FORM */}
      {restaurantId && (
        <div className="flex gap-3 mt-4">
          <select
            className="border p-2 rounded"
            value={form.foodId}
            onChange={(e) =>
              setForm({ ...form, foodId: e.target.value })
            }
          >
            <option value="">Select Food</option>
            {foods.map((f) => (
              <option key={f._id} value={f._id}>
                {f.title} (Stock: {f.totalStock})
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Stock"
            value={form.availableStock}
            className="border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, availableStock: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            className="border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />

          <button
            onClick={handleAssign}
            className="bg-blue-500 text-white px-4 rounded"
          >
            Assign
          </button>
        </div>
      )}

      {/* STOCK TABLE */}
      <div className="mt-6">
        <TableComponent
          columns={columns}
          data={stockData.map((s) => ({
            _id: s._id,
            food: s.foodId.title,
            price: s.price,
            availableStock: s.availableStock
          }))}
          pageSize={10}
          currentPage={1}
          totalItems={stockData.length}
        />
      </div>
    </div>
  );
};

export default PropertyFoodSection;
