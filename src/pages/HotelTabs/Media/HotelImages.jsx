import { LuImage } from "react-icons/lu";

const HotelImages = ({images}) => {
  const placeholders = Array.from({ length: 4 });
  const items = images.length ? images : placeholders;
  return (
    <>
      {console.log("This is the value of the images in the HotelImage", images)}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        { items.map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-100 rounded-xl border border-gray-200 h-28 md:h-32 lg:h-36 flex items-center justify-center overflow-hidden"
          >
            {console.log("This is the value of the item in the HotelImages", item)}
            {images.length ? (
              <img
              src={item}
              alt={`Hotel image ${idx + 1}`}
              className="h-full w-full object-cover"
              />
              ) : (
              <LuImage className="text-gray-400 text-3xl" />
            )}
          </div>
        )) }
      </div>
    </>
  )
}

export default HotelImages;