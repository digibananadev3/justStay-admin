import TabComponent from "../components/BasicComponent/TabComponent";
import PageHeading from "../components/PageHeading/PageHeading";
import PaymentGatewayConfiguration from "./SystemConfig/PaymentGatewayConfiguration";
import { TabList } from "./SystemConfig/TabList";

const SystemConfiguration = () => {
  return (
    <>
    <div>
      <PageHeading
        title="System Configuration"
        subTitle="Configure payment gateways, templates, and platform settings"
      />
    </div>

    <div>
      <TabComponent
        tabSection={TabList}
      />
    </div>
    </>
  );
};

export default SystemConfiguration;
