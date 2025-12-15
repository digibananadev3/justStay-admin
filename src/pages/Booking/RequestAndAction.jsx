import { LuInfo } from "react-icons/lu";

const Chip = ({ children }) => (
  <div className="w-full inline-flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 text-[14px] text-[#0A0A0A]">
    <LuInfo className="text-[#6A7282]" />
    {children}
  </div>
);

const Section = ({ title, children }) => (
  <div className="px-6">
    <h3 className="text-[16px] font-semibold text-[#101828] mb-3">{title}</h3>
    {children}
  </div>
);

const RequestAndAction = ({
  requests = ["Late checkout request"],
  note = "",
  onNoteChange = () => {},
}) => {
  return (
    <>
      <Section title="Special Requests">
        <div className="flex flex-wrap gap-3 w-full">
          {requests.map((r, i) => (
            <Chip key={i}>{r}</Chip>
          ))}
        </div>
      </Section>

      <div className="h-4" />

      <Section title="Admin Notes">
        <textarea
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="Add internal notes or comments about this booking..."
          className="w-full h-28 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-gray-200 text-sm placeholder:text-gray-400"
        />
      </Section>
    </>
  );
};

export default RequestAndAction;