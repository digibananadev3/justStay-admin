import { AiFillStar } from "react-icons/ai";

const Stars = ({ count = 0 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <AiFillStar key={i} className={i < count ? "text-yellow-400" : "text-gray-300"} />
    ))}
  </div>
);

const ReviewRow = ({ name, text, time, rating }) => (
  <div className="flex items-start justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
    <div>
      <p className="text-sm font-semibold text-[#101828]">{name}</p>
      <p className="text-sm text-gray-600 mt-1">{text}</p>
      <p className="text-xs text-gray-400 mt-1">{time}</p>
    </div>
    <Stars count={rating} />
  </div>
);

const ReviewList = ({
  items,
}) => {
  return (
    <>
      <div className="space-y-3">
        {items.map((r, idx) => (
          <ReviewRow key={idx} {...r} />)
        )}
      </div>
    </>
  );
};

export default ReviewList;