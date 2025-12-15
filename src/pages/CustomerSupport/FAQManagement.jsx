import { LuPlus, LuSquarePen } from "react-icons/lu";

const Badge = ({ children }) => (
  <span className="px-2.5 py-1 text-[12px] rounded-full border bg-[#DCFCE7] text-[#016630] font-medium border-emerald-200">
    {children}
  </span>
);

const FaqItem = ({ title, description, category }) => (
  <div className="w-full border border-gray-200 rounded-2xl px-5 py-4 bg-white flex items-start justify-between">
    <div>
      <h3 className="font-poppins font-semibold text-[16px] text-[#0F172A] mb-2">{title}</h3>
      <p className="text-[14px] leading-6 text-[#4A5565] mb-3">
        {description}
      </p>
      <p className="text-[13px] text-[#6A7282]">Category: {category}</p>
    </div>
    <div className="flex items-start gap-3">
      <Badge>Published</Badge>
      <button className="h-8 w-8 grid place-items-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50" aria-label="Edit FAQ">
        <LuSquarePen size={16} />
      </button>
    </div>
  </div>
);

const FAQManagement = () => {
  const faqs = [
    {
      id: "f1",
      title: "Why was my document verification rejected?",
      description:
        "Document verification can be rejected for several reasons: unclear image quality, mismatched name with account details, expired documents, or incomplete information. Please ensure your document is clear, valid, and matches your account information.",
      category: "Verification",
      status: "Published",
    },
    {
      id: "f2",
      title: "How long does withdrawal processing take?",
      description:
        "Withdrawal processing typically takes 2-5 business days. Verified users with matching bank details experience faster processing. Ensure your bank details match your verified identity documents.",
      category: "Withdrawal",
      status: "Published",
    },
    {
      id: "f3",
      title: "What documents are required for verification?",
      description:
        "For account verification, you need: 1) Government-issued photo ID (PAN card, Aadhaar, Passport), 2) Bank account details, 3) Address proof. All documents must be clear, valid, and match your account information.",
      category: "Verification",
      status: "Published",
    },
  ];

  return (
    <div className="mt-6">
      <div className="border border-gray-200 rounded-2xl p-6 bg-white">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-poppins text-[20px] leading-7 font-semibold text-[#0F172A]">FAQ Management</h2>
          <button type="button" className="inline-flex items-center gap-2 h-10 px-3 rounded-xl bg-[#009689] text-white hover:bg-[#00786F] transition">
            <LuPlus size={16} />
            <span className="text-[13px] font-medium">Add FAQ</span>
          </button>
        </div>

        <div className="space-y-4">
          {faqs.map((f) => (
            <FaqItem key={f.id} title={f.title} description={f.description} category={f.category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQManagement;