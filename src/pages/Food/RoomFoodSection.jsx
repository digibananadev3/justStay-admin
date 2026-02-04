import { useEffect, useState } from "react";
import { getAllRestaurants, getRestaurantFoods } from "../../services/food";
import toast from "react-hot-toast";
import TableComponent from "../../components/BasicComponent/TableComponent";

const RoomFoodSection = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      const res = await getAllRestaurants();
      setRestaurants(res.data);
    } catch {
      toast.error("Failed to load restaurants");
    }
  };

  const loadFoods = async (id) => {
    try {
      const res = await getRestaurantFoods(id);
      setFoods(res);
    } catch {
      toast.error("Failed to load foods");
    }
  };

  const columns = [
    { header: "Food Name", accessor: "title" },
    { header: "Category", accessor: "category" },
    { header: "Price", accessor: "price" },
    { header: "Available Stock", accessor: "availableStock" }
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Room / Restaurant Food List
      </h2>

      {/* SELECT RESTAURANT */}
      <select
        className="border p-2 rounded w-72"
        value={restaurantId}
        onChange={(e) => {
          setRestaurantId(e.target.value);
          loadFoods(e.target.value);
        }}
      >
        <option value="">Select Restaurant</option>
        {restaurants.map((r) => (
          <option key={r._id} value={r._id}>
            {r.name}
          </option>
        ))}
      </select>

      {/* FOOD TABLE */}
      {restaurantId && (
        <div className="mt-6">
          <TableComponent
            columns={columns}
            data={foods.map((f) => ({
              title: f.foodId.title,
              category: f.foodId.category,
              price: f.price,
              availableStock: f.availableStock
            }))}
            pageSize={10}
            currentPage={1}
            totalItems={foods.length}
          />
        </div>
      )}
    </div>
  );
};

export default RoomFoodSection;
