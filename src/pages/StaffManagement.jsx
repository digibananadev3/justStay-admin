import TabComponent from "../components/BasicComponent/TabComponent"
import PageHeading from "../components/PageHeading/PageHeading"
import CardInfo from "./StaffManagement/CardInfo"
import { TabList } from "./StaffManagement/TabList"

const StaffManagement = () => {
  return (
    <div>
      <PageHeading
        title="Staff Management"
        subTitle="Manage staff members, roles, and access permissions"
      />

      <div>
        <CardInfo />
      </div>

      <div className="mt-8">
        <TabComponent
          tabSection={TabList}
          style={"w-7/12"}
        />
      </div>
    </div>
  )
}

export default StaffManagement