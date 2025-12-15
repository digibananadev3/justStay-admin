import { useState } from "react";

const Toggle = ({ checked, onChange, ariaLabel }) => (
  <button
    type="button"
    onClick={onChange}
    aria-pressed={checked}
    aria-label={ariaLabel}
    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
      checked ? "bg-[#0B1023]" : "bg-gray-300"
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
        checked ? "translate-x-5" : "translate-x-1"
      }`}
    />
  </button>
);

const AcceptableIDTypes = () => {

  const [ids, setIds] = useState([
    { id: "pan", title: "PAN Card", desc: "10-character alphanumeric format", on: true },
    { id: "aadhaar", title: "Aadhaar Card", desc: "12-digit numeric format", on: true },
    { id: "passport", title: "Passport", desc: "International identification", on: false },
    { id: "dl", title: "Driving License", desc: "State-issued driving license", on: false },
    { id: "voter", title: "Voter ID", desc: "Election commission ID", on: false },
    { id: "passbook", title: "Bank Passbook", desc: "For address verification", on: true },
  ]);

  const toggleAt = (id) =>
    setIds((prev) => prev.map((i) => (i.id === id ? { ...i, on: !i.on } : i)));

  const left = ids.slice(0, 3);
  const right = ids.slice(3);

  const ItemRow = ({ item }) => (
    <div className="flex items-center justify-between py-4">
      <div>
        <p className="font-poppins font-semibold text-[14px] text-[#0F172A]">{item.title}</p>
        <p className="text-[13px] text-[#6A7282]">{item.desc}</p>
      </div>
      <Toggle checked={item.on} onChange={() => toggleAt(item.id)} ariaLabel={`Toggle ${item.title}`} />
    </div>
  );

  return (
    <div className="mt-6">
      <div className="border border-gray-200 rounded-2xl p-6 bg-white">
        <h2 className="font-poppins text-[20px] leading-7 font-semibold text-[#0F172A] mb-4">Acceptable ID Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
          <div>
            {left.map((item) => (
              <ItemRow key={item.id} item={item} />
            ))}
          </div>
          <div>
            {right.map((item) => (
              <ItemRow key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcceptableIDTypes