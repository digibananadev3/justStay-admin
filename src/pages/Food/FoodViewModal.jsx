import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { getFoodById } from "../../services/food";
import toast from "react-hot-toast";

const FoodViewModal = ({ foodId, isOpen, onClose }) => {
  const [food, setFood] = useState(null);

  useEffect(() => {
    if (foodId && isOpen) loadFood();
  }, [foodId, isOpen]);

  const loadFood = async () => {
    try {
      const res = await getFoodById(foodId);
      setFood(res.data);
    } catch {
      toast.error("Failed to load food");
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-[500px] rounded-xl p-6 shadow-xl">
        <h3 className="text-lg font-semibold mb-3">Food Details</h3>

        {!food ? (
          <p>Loading...</p>
        ) : (
          <>
            <h4 className="font-bold text-xl mb-1">{food.title}</h4>
            <p className="text-gray-500 mb-2">{food.category}</p>

            <div className="flex gap-2 mb-4">
              {food.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="food"
                  className="w-24 h-24 rounded object-cover border"
                />
              ))}
            </div>

            <p className="font-medium">
              Total Stock:{" "}
              <span className="text-blue-600">{food.totalStock}</span>
            </p>
          </>
        )}

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default FoodViewModal;
