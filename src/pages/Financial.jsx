import TabComponent from "../components/BasicComponent/TabComponent"
import PageHeading from "../components/PageHeading/PageHeading"
import { TabList } from "./Finacial/TabList"

const Financial = () => {
  return(
    <>
      <div className="mb-8">
        <PageHeading
          title={"Financial Oversight"}
          subTitle={"Monitor commissions, transactions, and withdrawals"}
        />
      </div>
      <div>
        <TabComponent tabSection={ TabList }/>
      </div>
    </>
  )
}

export default Financial