import AuditTrail from "./AuditTrail";
import RolePermissionTab from "./RolePermissionTab";
import StaffMamber from "./StaffMamber";

export const TabList = [[
  {
    label: "Staff Members",
    content: <StaffMamber />
  },
  {
    label: "Roles & Permissions",
    content: <RolePermissionTab />
  },
  {
    label: "Audit Trail",
    content: <AuditTrail />
  }
]]