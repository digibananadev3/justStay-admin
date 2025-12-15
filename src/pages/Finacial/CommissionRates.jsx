import CategoryWiseCommission from "./CategoryWiseCommission";
import CommissionRules from "./CommissionRules";
import CustomCommission from "./CustomCommission";
import OTBCommission from "./OTBCommission";
import PlatformFee from "./PlatformFee";

const CommissionRates = () => {
  return (
    <>
      <div className="pt-6">
        <p className="font-semibold text-[#101828] text-[30px] leading-[32px] tracking-[0px] mb-1">Hotel Commission System</p>
        <p className="text-[#4A5565] text-[14px] leading-[20px] tracking-[0px]">Flexible commission setup with category-wise and custom rates</p>
      </div>
      <div>
        <CategoryWiseCommission />
      </div>
      <div>
        <OTBCommission />
      </div>
      <div>
        <PlatformFee />
      </div>
      <div>
        <CustomCommission />
      </div>
      <div>
        <CommissionRules />
      </div>
    </>
  );
};

export default CommissionRates;