import SearchComponent from "../../components/BasicComponent/SearchComponent"
import SelectComponent from "../../components/BasicComponent/SelectComponent"

const VerificationFilter = () => {
  return(
    <>
      <div className="p-6 my-6 border border-gray-200 rounded-2xl grid grid-cols-6 gap-4">
        <div className="col-span-5">
          <SearchComponent />
        </div>
        <div className="col-span-1">
          <SelectComponent />
        </div>
      </div>
    </>
  )
}

export default VerificationFilter