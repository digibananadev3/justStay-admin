const THeadCell = ({ children }) => (
  <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#6A7282] uppercase tracking-wide">{children}</th>
);

const TCell = ({ children, right }) => (
  <td className={`px-4 py-3 text-[14px] ${right ? "text-right" : "text-[#0B1220]"}`}>{children}</td>
);

const RevenueBreakdown = ({
  rows = [
    { category: "Luxury Hotels", revenue: "₹5,60,55,451", commission: "₹84,08,318", bookings: "2,998", avg: "₹1,870" },
    { category: "Budget Hotels", revenue: "₹3,48,79,009", commission: "₹41,85,481", bookings: "2,833", avg: "₹1,231" },
    { category: "Hourly Stays", revenue: "₹2,11,73,541", commission: "₹38,11,237", bookings: "2,345", avg: "₹903" },
    { category: "Apartments", revenue: "₹1,24,59,889", commission: "₹14,70,148", bookings: "490", avg: "₹2,543" },
  ],
  total = { category: "Total", revenue: "₹12,45,67,890", commission: "₹1,78,75,184", bookings: "8,666", avg: "₹1,438" },
}) => {
  return (
    <div className="border rounded-2xl border-[#E5E7EB] p-5 bg-white">
      <p className="text-[#101828] text-[18px] font-semibold mb-3">Revenue Breakdown by Category</p>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#EEF2F7]">
          <thead className="bg-[#F8FAFC]">
            <tr>
              <THeadCell>CATEGORY</THeadCell>
              <THeadCell>REVENUE</THeadCell>
              <THeadCell>COMMISSION</THeadCell>
              <THeadCell>BOOKINGS</THeadCell>
              <THeadCell>AVG. VALUE</THeadCell>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {rows.map((r, i) => (
              <tr key={i} className="hover:bg-[#FAFAFB]">
                <TCell>{r.category}</TCell>
                <TCell right>{r.revenue}</TCell>
                <TCell right>{r.commission}</TCell>
                <TCell right>{r.bookings}</TCell>
                <TCell right>{r.avg}</TCell>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-[#F8FAFC]">
              <td className="px-4 py-3 text-[14px] font-semibold text-[#0B1220]">{total.category}</td>
              <td className="px-4 py-3 text-[14px] font-semibold text-right">{total.revenue}</td>
              <td className="px-4 py-3 text-[14px] font-semibold text-right">{total.commission}</td>
              <td className="px-4 py-3 text-[14px] font-semibold text-right">{total.bookings}</td>
              <td className="px-4 py-3 text-[14px] font-semibold text-right">{total.avg}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default RevenueBreakdown;