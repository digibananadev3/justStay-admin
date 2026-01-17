import { LuImage } from "react-icons/lu";
import { TbEdit } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";

const HotelImages = ({ images = [], onEditImage, onDeleteImage }) => {
  const placeholders = Array.from({ length: 4 });
  const items = images.length ? images : placeholders;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, idx) => (
        <div
          key={item?._id || idx}
          className="
            relative group
            bg-gray-100 rounded-xl border border-gray-200 
            h-28 md:h-32 lg:h-36 
            flex items-center justify-center 
            overflow-hidden
          "
        >
          {images.length ? (
            <>
              <img
                src={item.url}
                alt={`Hotel image ${idx + 1}`}
                className="h-full w-full object-cover"
              />

              {/* Overlay actions */}
              <div
                className="
                  absolute top-2 right-2 flex gap-2 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity
                "
              >
                {/* EDIT */}
                <button
                  onClick={() => onEditImage?.(item)}
                  className="bg-white p-1.5 rounded-full shadow hover:bg-gray-100"
                >
                  <TbEdit className="text-[#0F766E] text-lg" />
                </button>

                {/* DELETE (send only ID) */}
                <button
                  onClick={() => onDeleteImage?.(item._id)}
                  className="bg-white p-1.5 rounded-full shadow hover:bg-gray-100"
                >
                  <AiOutlineDelete className="text-red-500 text-lg" />
                </button>
              </div>
            </>
          ) : (
            <LuImage className="text-gray-400 text-3xl" />
          )}
        </div>
      ))}
    </div>
  );
};

export default HotelImages;
