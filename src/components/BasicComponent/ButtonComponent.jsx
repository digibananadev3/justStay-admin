const ButtonComponent = ({ onExport }) => {
  return (
    <>
      <button onClick={onExport} className="flex items-center justify-center gap-2 border rounded-md px-4 py-2 hover:bg-gray-50 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M12 4v16m8-8H4" />
        </svg>
        Export
      </button>
    </>
  )
}

export default ButtonComponent