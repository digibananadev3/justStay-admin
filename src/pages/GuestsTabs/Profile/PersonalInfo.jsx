
const InfoList = [{lable: "Full Name:", value: "Rahul Sharma", access: "firstName"},
  {lable: "Date of Birth:", value: "1992-05-05", access: "dob"},
  {lable: "Gender:", value: "Rahul Sharma", access: "gender"},
  {lable: "Location:", value: "Rahul Sharma", access: "location"},
  {lable: "Registration:", value: "Rahul Sharma", access: "registration"}
]

const PersonalInfo = ({userDetail}) => {
  const fullName = () => {
    return `${userDetail?.firstName} ${userDetail?.lastName}`
  }

  const getFirstLetter = () => {
    return userDetail?.firstName?.charAt(0) || 'N'
  }

  return(
    <>
      <div>
        <p className="font-poppins font-medium text-[14px] leading-5 tracking-[0px] text-[#101828] pb-10">Personal Information</p>
        <div>
          <div className="mx-auto w-32 h-32 rounded-full bg-linear-to-br from-teal-200 to-teal-100 flex items-center justify-center shadow-lg">
              <span className="text-teal-900 text-5xl font-bold">{getFirstLetter() }</span>
          </div>
          {
            InfoList.map((info) => (
              <div key={info.lable} className="flex justify-between mt-4">
                <p className="font-poppins font-normal text-[14px] leading-5 tracking-[0px] text-[#4A5565]">{info.lable}</p>
                <p className="font-poppins font-medium text-[14px] leading-5 tracking-[0px] text-[#101828]">{info.access=== "firstName"? fullName() : userDetail?.[info.access] || info.value}</p>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default PersonalInfo