import { useQuery } from "@tanstack/react-query"
import ButtonComponent from "../BasicComponent/ButtonComponent"
import SearchComponent from "../BasicComponent/SearchComponent"
import SelectComponent from "../BasicComponent/SelectComponent"
import { handleFilterGuestUserList } from "../../services/guestUser"
import { useCallback, useEffect, useState } from "react"
import Dropdown from "../BasicComponent/SelectComponent"
import ExportButton from "../BasicComponent/ExportComponent"

const GuestFilters = ({updateGuestList}) => {
  const [inputSearch, setInputSearch] = useState("")
  const [status, setStatus] = useState("All Status")
  const [kyc, setKyc] = useState("All KYC")
  const statusOptions = ["All Status", "Active", "Inactive"]
  const kycOptions = ["All KYC", "Verified", "Pending", "Rejected"]

  const {data: apiData, isLoading, error, isFetched} = useQuery({
    queryKey: ["guestList", inputSearch, status, kyc],
    queryFn: () =>{
      const params = inputSearch || status || kyc ? { search: inputSearch, status: status === "All Status" ? "" : status, kyc: kyc === "All KYC" ? "" : kyc } : {}
      return handleFilterGuestUserList(params)
    },
    enabled: true,
    staleTime: 0
  })

  const handleSearchValue = useCallback((value) => {
    setInputSearch(value)
  }, [])

  const handleExport = () => {
    console.log("export data")
  };

  useEffect(()=> {
    if(apiData?.data) {
      const data = apiData?.data?.map((item) => ({
        guest: item?.firstName + " " + item?.lastName,
        user_id: item?._id,
        contact: item?.email,
        contact_no: item?.phone,
        location: item?.city,
        state: item?.state,
        status: item?.status,
        kyc: item?.kyc,
        wallet: item?.wallet,
        earned: item?.earned,
        bookings: item?.bookings,
        spent: item?.spent
      }))

      updateGuestList(data)
    }
  }, [isFetched, apiData?.data])

  return(
    <div className="grid grid-cols-8 gap-4 items-center">
      <div className="col-span-5">
        <SearchComponent
          handleSearchValue={handleSearchValue}
        />
      </div>
      <div>
        <Dropdown
          options={statusOptions}
          selected={status}
          onSelect={(value) => setStatus(value)}
        />

      </div>
      <div>
        <SelectComponent
          options={kycOptions}
          selected={kyc}
          onSelect={(value) => setKyc(value)}
        />
      </div>
      <div>
        <ExportButton
          onClick={handleExport}
        />
      </div>
    </div>
  )
}

export default GuestFilters