import { useMemo, useState } from "react";
import TableComponent from "../../components/BasicComponent/TableComponent";
import { LuEye, LuFilter, LuChevronDown } from "react-icons/lu";
import { AiOutlineUserAdd } from "react-icons/ai";
import AddStaff from "./AddStaff";
import { Drawer } from "flowbite-react";
import DrawerTitleComponent from "../../components/Drawer/DrawerTitleComponent";
import StaffMamerInfo from "./StaffMamerInfo";
import StaffMamberDrawer from "./StaffMamberDrawer";

const Avatar = ({ name }) => {
  const initial = name?.[0]?.toUpperCase() || "?";
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#CBFBF1] text-[#00786F] border border-[#CBFBF1] text-[12px] font-semibold">
      {initial}
    </span>
  );
};

const chip = (label, classes) => (
  <span className={`px-2.5 py-1 text-[12px] rounded-xl border font-medium ${classes}`}>{label}</span>
);

const StaffMamber = () => {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("All");
  const [status, setStatus] = useState("All");
  const [openAdd, setOpenAdd] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selected, setSelected] = useState(null);

  const data = [
    {
      id: "STF001",
      name: "Rajesh Kumar",
      email: "rajesh.k@juststay.com",
      department: "Operations",
      role: "Super Admin",
      status: "active",
      lastLogin: "2025-10-10 9:30 AM",
      twoFA: true,
      sessions: 2,
    },
    {
      id: "STF002",
      name: "Priya Sharma",
      email: "priya.s@juststay.com",
      department: "Verification",
      role: "Verification Officer",
      status: "active",
      lastLogin: "2025-10-10 8:15 AM",
      twoFA: true,
      sessions: 1,
    },
    {
      id: "STF003",
      name: "Amit Patel",
      email: "amit.p@juststay.com",
      department: "Support",
      role: "Support Agent",
      status: "active",
      lastLogin: "2025-10-09 6:45 PM",
      twoFA: false,
      sessions: 1,
    },
    {
      id: "STF004",
      name: "Vikram Singh",
      email: "vikram.s@juststay.com",
      department: "Content",
      role: "Content Manager",
      status: "inactive",
      lastLogin: "2025-09-28 4:30 PM",
      twoFA: false,
      sessions: 1,
    },
  ];

  const filtered = useMemo(() => {
    return data.filter((r) => {
      const matchesQuery =
        !query ||
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.email.toLowerCase().includes(query.toLowerCase()) ||
        r.id.toLowerCase().includes(query.toLowerCase());
      const matchesDept = dept === "All" || r.department === dept;
      const matchesStatus = status === "All" || r.status === status.toLowerCase();
      return matchesQuery && matchesDept && matchesStatus;
    });
  }, [query, dept, status]);

  const columns = [
    {
      header: "Staff Member",
      accessor: "name",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <Avatar name={value} />
          <div>
            <p className="font-poppins font-medium text-[14px] leading-5">{value}</p>
            <p className="font-poppins text-[12px] leading-4 text-[#6A7282]">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Department",
      accessor: "department",
      render: (value) =>
        chip(
          value,
          "bg-[#E5EDFF] text-[#3A6FF8] border-[#E5EDFF]"
        ),
    },
    {
      header: "Role",
      accessor: "role",
      render: (value) =>
        chip(
          value,
          "bg-[#F3E8FF] text-[#7C3AED] border-[#F3E8FF]"
        ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) =>
        value === "active"
          ? chip("active", "bg-[#DCFCE7] text-[#016630] border-[#DCFCE7]")
          : chip("inactive", "bg-[#FFE2E2] text-[#9F0712] border-[#FFE2E2]"),
    },
    { header: "Last Login", accessor: "lastLogin" },
    {
      header: "Security",
      accessor: "twoFA",
      render: (value, row) => (
        <div className="flex items-center gap-2">
          {value
            ? chip("2FA", "bg-[#DCFCE7] text-[#016630] border-[#DCFCE7]")
            : chip("No 2FA", "bg-gray-100 text-gray-700 border-gray-200")}
          {chip(
            `${row.sessions} ${row.sessions === 1 ? "session" : "sessions"}`,
            "bg-[#E5EDFF] text-[#3A6FF8] border-[#E5EDFF]"
          )}
        </div>
      ),
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (_, row) => (
        <button
          className="inline-flex items-center gap-2 h-8 px-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-[#0F172A]"
          onClick={() => { setSelected(row); setOpenView(true); }}
        >
          <LuEye size={16} />
          <span className="text-[12px] font-medium">View</span>
        </button>
      ),
    },
  ];

  return (
    <div className="mt-6">
      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, email, or staff ID..."
          className="flex-1 min-w-[240px] h-11 px-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />

        <button type="button" className="inline-flex items-center gap-2 h-11 px-3 rounded-xl border border-gray-200 text-gray-800 hover:bg-gray-50">
          <LuFilter size={16} />
          <span className="text-[13px] font-medium">All Departments</span>
          <LuChevronDown size={16} />
        </button>

        <button type="button" className="inline-flex items-center gap-2 h-11 px-3 rounded-xl border border-gray-200 text-gray-800 hover:bg-gray-50">
          <span className="text-[13px] font-medium">All Status</span>
          <LuChevronDown size={16} />
        </button>

        <button
          type="button"
          onClick={() => setOpenAdd(true)}
          className="ml-auto inline-flex items-center gap-2 h-11 px-3 rounded-xl bg-[#009689] text-white hover:bg-[#00786F]"
        >
          <AiOutlineUserAdd size={20} />
          <span className="text-[13px] font-medium">Add Staff</span>
        </button>
      </div>

      <TableComponent columns={columns} data={filtered} />

      <AddStaff
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onCreate={(payload) => {
          // TODO: integrate API call
          console.log("create staff:", payload);
          setOpenAdd(false);
        }}
      />

      <Drawer open={openView} onClose={() => setOpenView(false)} position="right" className="w-1/2 bg-white!">
        <DrawerTitleComponent
          title={selected?.name ? `Staff Profile - ${selected.name}` : "Staff Profile"}
          subTitle={"View and manage staff member details and permissions"}
        />

        <div>
          <StaffMamberDrawer staff={selected} />
        </div>
      </Drawer>
    </div>
  );
};

export default StaffMamber;