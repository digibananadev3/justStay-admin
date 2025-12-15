const SummaryCard = ({ title, iconRight, value, rows = [] }) => (
  <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
    <div className="flex items-start justify-between">
      <p className="text-[#101828] text-[18px] font-semibold">{title}</p>
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#E6FFFA] text-[#009689]">
        {iconRight}
      </span>
    </div>
    <p className="mt-4 text-[30px] leading-[34px] font-semibold text-[#0B1220]">{value}</p>
    <div className="mt-4 space-y-2">
      {rows.map((r, i) => (
        <div key={i} className="flex items-center justify-between text-[14px]">
          <span className="text-[#6A7282] ">{r.label}</span>
          <span className="text-[#0B1220]">{r.value}</span>
        </div>
      ))}
    </div>
  </div>
);

export default SummaryCard;