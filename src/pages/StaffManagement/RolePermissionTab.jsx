const Chip = ({ children, className = "" }) => (
  <span className={`inline-flex items-center rounded-xl px-2.5 py-1 text-[12px] bg-[#DCFCE7] text-[#016630] border border-[#DCFCE7] font-medium ${className}`}>
    {children}
  </span>
);

const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center rounded-xl px-2.5 py-1 text-[12px] ${className}`}>{children}</span>
);

const RoleCard = ({ title, desc, chips, note, badge, tone }) => {
  const tones = {
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      badge: "bg-purple-100 text-purple-700 border border-purple-200",
    },
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      badge: "bg-indigo-100 text-indigo-700 border border-indigo-200",
    },
    teal: {
      bg: "bg-teal-50",
      border: "border-teal-200",
      badge: "bg-teal-100 text-teal-700 border border-teal-200",
    },
    green: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      badge: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    },
    yellow: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      badge: "bg-amber-100 text-amber-700 border border-amber-200",
    },
  };
  const t = tones[tone] || tones.purple;

  return (
    <div className={`rounded-xl ${t.bg} ${t.border} border p-4`}> 
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-[15px] font-semibold text-[#0F172A]">{title}</h4>
          <p className="text-[12px] text-[#6A7282] mt-1">{desc}</p>
        </div>
        <Badge className={t.badge}>{badge}</Badge>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {chips?.map((c, idx) => (
          <Chip key={idx}>{c}</Chip>
        ))}
        {note ? <span className="text-[12px] text-[#6A7282] ml-1">{note}</span> : null}
      </div>
    </div>
  );
};

const RolePermissionTab = () => {
  const roles = [
    {
      title: "Super Admin",
      desc: "Full system access and control",
      chips: [
        "All Permissions",
        "User Management",
        "Financial Control",
        "System Configuration",
        "Content Management",
      ],
      badge: "1 members",
      tone: "purple",
    },
    {
      title: "Manager",
      desc: "Departmental oversight and approval authority",
      chips: [
        "User Management (View, Edit, Suspend)",
        "Verification (Approve)",
        "Content (Publish, Create Offers)",
        "Analytics (View, Export)",
      ],
      note: "Limited Financial Access",
      badge: "1 members",
      tone: "blue",
    },
    {
      title: "Support Agent",
      desc: "Customer support and ticket management",
      chips: [
        "User Management (View Only)",
        "Verification (View Only)",
      ],
      note: "No Financial Access    No System Config",
      badge: "1 members",
      tone: "teal",
    },
    {
      title: "Finance Officer",
      desc: "Financial transactions and reporting",
      chips: [
        "Financial (View, Process Withdrawals)",
        "Analytics (View, Export)",
        "User Management (View Only)",
      ],
      note: "No System Config",
      badge: "1 members",
      tone: "green",
    },
    {
      title: "Verification Officer",
      desc: "KYC and document verification",
      chips: [
        "Verification (View, Approve/Reject)",
        "User Management (View Only)",
        "Analytics (View Only)",
      ],
      note: "No Financial Access",
      badge: "1 members",
      tone: "yellow",
    },
    {
      title: "Content Manager",
      desc: "Content publishing and campaign management",
      chips: [
        "Content (Publish, Create Offers, Notifications)",
        "System Config (Edit Templates)",
        "Analytics (View Only)",
      ],
      note: "No Financial Access",
      badge: "1 members",
      tone: "purple",
    },
  ];

  return (
    <div>
      <h3 className="text-[16px] font-semibold text-[#0F172A]">Role Templates & Permissions</h3>
      <p className="text-[12px] text-[#6A7282] mt-1">Predefined role templates with associated permissions. Customize permissions for individual staff members.</p>

      <div className="mt-5 space-y-4">
        {roles.map((r, i) => (
          <RoleCard key={i} {...r} />
        ))}
      </div>
    </div>
  );
};

export default RolePermissionTab;