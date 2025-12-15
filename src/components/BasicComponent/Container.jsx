const Container = ({title, children }) => {
  return(
    <div className="border rounded-2xl border-[#E5E7EB] p-4 mb-4">
      <p className="font-poppins font-medium text-[14px] leading-5 tracking-[0px] text-[#101828] mb-9">{title}</p>
      {children }
    </div>
  )
}

export default Container