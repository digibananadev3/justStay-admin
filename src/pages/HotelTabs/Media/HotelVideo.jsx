import { AiOutlinePlayCircle } from 'react-icons/ai';
import { LuUpload } from 'react-icons/lu';

const HotelVideo = ( {videoUrl = "", onSelect }) => {
  const handleChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file && onSelect) onSelect(file);
  };
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-gray-100 rounded-xl border border-gray-200 h-48 md:h-60 lg:h-72 flex items-center justify-center overflow-hidden">
          {videoUrl ? (
          <video src={videoUrl} controls className="h-full w-full object-cover" />
          ) : (
          <AiOutlinePlayCircle className="text-gray-400 text-5xl" />
          )}
        </div>
          <label className="bg-white rounded-xl border border-gray-200 h-48 md:h-60 lg:h-72 flex items-center justify-center cursor-pointer">
            <input type="file" accept="video/*" className="hidden" onChange={handleChange} />
            <div className="flex flex-col items-center text-gray-500">
              <LuUpload className="text-2xl" />
              <span className="mt-2 text-sm">Upload Video</span>
            </div>
        </label>
      </div>
    </>
  );
};

export default HotelVideo