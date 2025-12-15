import { LuGlobe, LuDollarSign, LuPlus } from "react-icons/lu";

const Badge = ({ children }) => (
  <span className="px-2.5 py-1 text-[12px] rounded-full border bg-[#DCFCE7] text-[#016630] font-medium border-emerald-200">{children}</span>
);

const Row = ({ icon: Icon, title, subtitle }) => (
  <div className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white flex items-center justify-between">
    <div className="flex items-center gap-3">
      <span className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 grid place-items-center border border-blue-100">
        <Icon size={16} />
      </span>
      <div>
        <p className="font-poppins font-semibold text-[14px] text-[#0F172A]">{title}</p>
        {subtitle && <p className="text-[13px] text-[#6A7282]">{subtitle}</p>}
      </div>
    </div>
    <Badge>Active</Badge>
  </div>
);

const Localization = () => {
  const languages = [{ id: "en", title: "English (Default)", subtitle: "" }];
  const currencies = [{ id: "inr", title: "Indian Rupee (₹) - Default", subtitle: "" }];

  return (
    <div className="mt-6">
      <div className="border border-gray-200 rounded-2xl p-6 bg-white">
        <h2 className="font-poppins text-[20px] leading-7 font-semibold text-[#0F172A] mb-6">Multi-language & Multi-currency Support</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="font-poppins text-[14px] font-semibold text-[#0F172A] mb-3">Supported Languages</p>
            <div className="space-y-3">
              {languages.map((l) => (
                <Row key={l.id} icon={LuGlobe} title={l.title} subtitle={l.subtitle} />
              ))}
              <button type="button" className="w-full inline-flex items-center justify-center gap-2 h-10 rounded-xl border border-gray-200 text-gray-800 hover:bg-gray-50 transition">
                <LuPlus size={16} />
                <span className="text-[13px] font-medium">Add Language</span>
              </button>
            </div>
          </div>

          <div>
            <p className="font-poppins text-[14px] font-semibold text-[#0F172A] mb-3">Supported Currencies</p>
            <div className="space-y-3">
              {currencies.map((c) => (
                <Row key={c.id} icon={LuDollarSign} title={c.title} subtitle={c.subtitle} />
              ))}
              <button type="button" className="w-full inline-flex items-center justify-center gap-2 h-10 rounded-xl border border-gray-200 text-gray-800 hover:bg-gray-50 transition">
                <LuPlus size={16} />
                <span className="text-[13px] font-medium">Add Currency</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Localization