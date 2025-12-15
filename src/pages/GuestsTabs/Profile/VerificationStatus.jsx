const InfoList = [{lable: "Email", value: "Verified", access: "emailVerified"},
  {lable: "Phone", value: "Verified", access: "phoneVerified"},
  {lable: "KYC Status", value: "Verified", access: "kycVerified"}
]

const VerificationStatus = ({verificationDetail}) => {

  return(
    <>
      <p className="font-poppins font-medium text-[14px] leading-5 tracking-[0px] text-[#101828]">Verification Status</p>
      {
        InfoList.map((info) => (
          <div key={info.lable} className="flex justify-between mt-4">
            <p className="font-poppins font-normal text-[14px] leading-5 tracking-[0px] text-[#4A5565]">{info.lable}</p>
            <span className="px-2 py-1 bg-green-100 text-green-800 font-poppins font-medium text-[12px] leading-4 tracking-[0px] rounded-full">
              {verificationDetail?.[info.access] ? "Verified" : "Not Verified"}
            </span>
          </div>
        ))
      }
    </>
  )
}

export default VerificationStatus