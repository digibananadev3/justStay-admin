import { useSelector } from "react-redux";
import AccountStatistics from "./Profile/AccountStatistics";
import PersonalInfo from "./Profile/PersonalInfo";
import VerificationStatus from "./Profile/VerificationStatus";
import { useQuery } from "@tanstack/react-query";
import { fetchGuestData } from "../../services/guestUser";
import Loader from "../../components/BasicComponent/Loader";


const GuestsProfile = () => {
  const {guestId} = useSelector((state) => state.guest)
  const {data, isFetching, error} = useQuery({
    queryKey: ["guest", guestId],
    queryFn: () => fetchGuestData(guestId)
  })

  if(isFetching) return <Loader />
  console.log(data)
  return(
    <>
      <div className="flex gap-4">
        <div className="w-full bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <PersonalInfo
            userDetail={data?.data?.user}
          />
        </div>
        <div className="w-full bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <VerificationStatus
            verificationDetail={data?.data?.verification}
          />
        </div>
      </div>
      <div className="my-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
        <AccountStatistics
          accountDetail={data?.data?.stats}
        />
      </div>
    </>
  )
}

export default GuestsProfile;