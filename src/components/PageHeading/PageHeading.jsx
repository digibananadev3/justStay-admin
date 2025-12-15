const PageHeading = ({
  title,
  subTitle
}) => {
  return(
    <>
      <h1 className="font-poppins font-semibold text-[30px] leading-9 tracking-[0px] text-[#101828]">
        {title}
      </h1>
      <p className="font-poppins font-normal text-[16px] leading-6 tracking-[0px] pt-2">    
        {subTitle}
      </p>
    </>
  )
}

export default PageHeading