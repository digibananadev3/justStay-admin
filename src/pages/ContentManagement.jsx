import PageHeading from "../components/PageHeading/PageHeading";
import { TabList } from "./Content/Tablist";
import TabComponent from "../components/BasicComponent/TabComponent";

const ContentManagement = () => {
  return (
    <>
      <div className="mb-8">
        <PageHeading
          title={"Content Management"}
          subTitle={"Manage platform content, hotel listings, offers, and notifications"}
        />
      </div>

      <div>
        <TabComponent tabSection={ TabList } style={"w-7/12"} />
      </div>
    </>
  );
};

export default ContentManagement;