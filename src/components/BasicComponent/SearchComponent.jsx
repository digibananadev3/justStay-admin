import { useCallback, useEffect, useState } from "react";
import InputComponent from "./InputComponent";
const SearchComponent = ({handleSearchValue}) => {

  return(
    <div className="w-full">
      <InputComponent
        isSearchIcon={true}
        placeholder="Search by name, email, phone, or ID..."
        handleValue={handleSearchValue}
      />
    </div>
  )
}

export default SearchComponent;