const Chip = ({ children }) => (
  <span className="inline-flex font-medium items-center rounded-xl px-2.5 py-1 text-[12px] bg-[#DCFCE7] text-[#016630] border border-[#DCFCE7]">
    {children}
  </span>
);

const Row = ({ label, children }) => (
  <div className="">
    <p className="col-span-4 text-[13px] font-medium text-[#0F172A]">{label}</p>
    <div className="col-span-8 flex flex-wrap gap-2 my-3">{children}</div>
  </div>
);

const RolePermission = () => {
  return (
    <div className="mt-6">
      <h3 className="text-[16px] font-semibold text-[#0F172A] mb-3">Role Permissions</h3>
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="divide-y divide-gray-100 p-4">
          <Row label="User Management">
            <Chip>View</Chip>
            <Chip>Edit</Chip>
            <Chip>Suspend</Chip>
          </Row>
          <Row label="Verification">
            <Chip>View</Chip>
            <Chip>Approve/Reject</Chip>
          </Row>
          <Row label="Financial">
            <Chip>View Transactions</Chip>
            <Chip>Process Withdrawals</Chip>
            <Chip>Set Commission</Chip>
          </Row>
          <Row label="Content">
            <Chip>Publish</Chip>
            <Chip>Create Offers</Chip>
            <Chip>Send Notifications</Chip>
          </Row>
          <Row label="Analytics">
            <Chip>View Reports</Chip>
            <Chip>Export Data</Chip>
          </Row>
          <Row label="System Configuration">
            <Chip>Modify Gateways</Chip>
            <Chip>Edit Templates</Chip>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default RolePermission;