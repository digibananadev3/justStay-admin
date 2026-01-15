import { LuImage } from "react-icons/lu";

const HotelImages = ({ images = [] }) => {
  const placeholders = Array.from({ length: 4 });
  const items = images.length ? images : placeholders;

  console.log("Images received in HotelImages:", images);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="bg-gray-100 rounded-xl border border-gray-200 h-28 md:h-32 lg:h-36 flex items-center justify-center overflow-hidden"
        >
          {images.length ? (
            <img
              src={item.url}   // ✅ CORRECT WAY
              alt={`Hotel image ${idx + 1}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <LuImage className="text-gray-400 text-3xl" />
          )}
        </div>
      ))}
    </div>
  );
};

export default HotelImages;
