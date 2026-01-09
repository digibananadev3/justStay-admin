import { CiEdit } from "react-icons/ci";

const Container = ({ title, children, onEditAmenities }) => {
  const isAmenities = title === "Amenities Management";
  return (
    <div className="border rounded-2xl border-[#E5E7EB] p-4 mb-4">
      {/* {console.log("This is the value of the title in the Container component", title)} */}
      {/* {console.log("This is the value of the children in the Container component", children)} */}
      <div className="flex items-center justify-between mb-9">
        <p className="font-poppins font-medium text-[14px] leading-5 text-[#101828]">
          {title}
        </p>

        {/* Show Edit button ONLY for Amenities Management */}
        {isAmenities && (
          <button
            onClick={onEditAmenities}
            className="text-blue-600 font-medium hover:underline flex gap-2 items-center text-lg cursor-pointer"
          >
           <CiEdit />
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

export default Container;
