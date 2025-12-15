import { useState } from "react";
import { LuX } from "react-icons/lu";

const AddStaff = ({ open, onClose, onCreate }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate && onCreate({ fullName, email, phone, department, role });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[18px] font-semibold text-[#0F172A]">Add New Staff Member</h3>
            <p className="mt-1 text-[13px] text-[#6A7282]">Create a new staff account with role and permissions</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#6A7282] hover:bg-gray-100"
          >
            <LuX size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="mb-1 block text-[13px] font-medium text-[#0F172A]">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter full name"
              className="w-full h-11 rounded-lg border border-gray-200 bg-gray-50 px-3 text-[14px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div>
            <label className="mb-1 block text-[13px] font-medium text-[#0F172A]">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@juststay.com"
              className="w-full h-11 rounded-lg border border-gray-200 bg-gray-50 px-3 text-[14px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div>
            <label className="mb-1 block text-[13px] font-medium text-[#0F172A]">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full h-11 rounded-lg border border-gray-200 bg-gray-50 px-3 text-[14px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div>
            <label className="mb-1 block text-[13px] font-medium text-[#0F172A]">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full h-11 rounded-lg border border-gray-200 bg-gray-50 px-3 text-[14px] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-emerald-200"
            >
              <option value="" disabled>
                Select department
              </option>
              <option value="Operations">Operations</option>
              <option value="Verification">Verification</option>
              <option value="Support">Support</option>
              <option value="Content">Content</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-[13px] font-medium text-[#0F172A]">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full h-11 rounded-lg border border-gray-200 bg-gray-50 px-3 text-[14px] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-emerald-200"
            >
              <option value="" disabled>
                Select role
              </option>
              <option value="Super Admin">Super Admin</option>
              <option value="Verification Officer">Verification Officer</option>
              <option value="Support Agent">Support Agent</option>
              <option value="Content Manager">Content Manager</option>
            </select>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-lg border border-gray-200 px-4 text-[13px] font-medium text-[#0F172A] hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-10 rounded-lg bg-[#009689] px-4 text-[13px] font-medium text-white hover:bg-[#00786F]"
            >
              Create Staff Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaff;