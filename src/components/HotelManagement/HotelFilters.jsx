import ButtonComponent from "../BasicComponent/ButtonComponent"
import SearchComponent from "../BasicComponent/SearchComponent"
import SelectComponent from "../BasicComponent/SelectComponent"

const HotelFilters = ({ handleSearch, status, onStatusChange, onExport }) => {
  const STATUS_OPTIONS = ["All", "Under Review", "Rejected", "Accepted"];
  return(
    <div className="grid grid-cols-8 gap-4 items-center">
      <div className="col-span-4">
        <SearchComponent handleSearchValue={handleSearch}/>
      </div>
      <div>
        <SelectComponent
          options={STATUS_OPTIONS}
          selected={status}
          placeholder="Status"
          onSelect={onStatusChange}/>
      </div>
      <div>
        <ButtonComponent onExport={onExport} />
      </div>
    </div>
  )
}

export default HotelFilters