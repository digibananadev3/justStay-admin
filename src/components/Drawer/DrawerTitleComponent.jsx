const DrawerTitleComponent = ({
  title,
  subTitle,
  openEdit
}) => {
  return(
    <>
      <div className="flex justify-between m-10">
        <div>
          <h1 className="font-poppins font-semibold text-[16px] leading-6 tracking-[0px] text-[#0A0A0A]">{title}</h1>
          <p className="font-poppins font-normal text-[14px] leading-5 tracking-[0px]">{subTitle}</p>
        </div>
        <div>
          <button className="cursor-pointer" onClick={openEdit}>Edit</button>
        </div>
      </div>
    </>
  )
}

export default DrawerTitleComponent