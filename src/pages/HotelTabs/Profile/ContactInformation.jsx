import { LuMail } from 'react-icons/lu';
import { LuPhone } from 'react-icons/lu';
import { LuPhoneCall } from 'react-icons/lu';   
const ContactInformation = ({ contact }) => {
 const data = {
 email: "tajpalace@hotels.com",
 phone: "+91 98765 43210",
 landline: "022-12345678",
 owner: "Vikram Hotels Pvt Ltd",
 ...contact,
 };
 return (
  <div className="grid grid-cols-2 gap-y-6 gap-x-10">
    <div>
      <p className="text-[#4A5565] text-[12px] leading-4 tracking-[0px] mb-1">Email</p>
      <div className="flex items-center gap-2">
        <span className="text-gray-400"><LuMail /></span>
        <p className="text-[#101828] font-semibold text-[14px] leading-5 tracking-[0px]">{data.email}</p>
      </div>
    </div>
    <div>
      <p className="text-[#4A5565] text-[12px] leading-4 tracking-[0px] mb-1">Phone</p>
      <div className="flex items-center gap-2">
        <span className="text-gray-400"><LuPhone /></span>
        <p className="text-[#101828] font-semibold text-[14px] leading-5 tracking-[0px]">{data.phone}</p>
      </div>
    </div>
    <div>
      <p className="text-[#4A5565] text-[12px] leading-4 tracking-[0px] mb-1">Landline</p>
      <div className="flex items-center gap-2">
        <span className="text-gray-400"><LuPhoneCall /></span>
        <p className="text-[#101828] font-semibold text-[14px] leading-5 tracking-[0px]">{data.landline}</p>
      </div>
    </div>
    <div>
      <p className="text-[#4A5565] text-[12px] leading-4 tracking-[0px] mb-1">Owner</p>
      <p className="text-[#101828] font-semibold text-[14px] leading-5 tracking-[0px]">{data.owner}</p>
    </div>
  </div>
 );
};

export default ContactInformation;  