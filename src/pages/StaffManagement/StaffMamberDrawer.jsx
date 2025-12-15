import RolePermission from "./RolePermission";
import SecuritySettings from "./SecuritySettings";
import StaffMamerInfo from "./StaffMamerInfo";
import AdminAction from "./AdminAction";

const StaffMamberDrawer = ({staff}) => {
  return (
    <>
      <div>
        <StaffMamerInfo staff={staff} />  
      </div>

      <div>
        <RolePermission />
      </div>
      <div>
        <SecuritySettings />
      </div>
      <div>
        <AdminAction />
      </div>
    </>
  );
};

export default StaffMamberDrawer;