import { FaClockRotateLeft } from 'react-icons/fa6';
import ActivityComponent from '../../../components/BasicComponent/ActivityComponent';

const GuestActivity = () => {

  const activityList = [
    {
      title: "Logged in from Mumbai",
      time: "2 hours ago",
      symbol: <FaClockRotateLeft className='text-[#009689]' />,
      bgIcon: "bg-[#CBFBF1]"
    },
    {
      title: "Logged in from Mumbai",
      time: "2 hours ago",
      symbol: <FaClockRotateLeft className='text-[#009689]' />,
      bgIcon: "bg-[#CBFBF1]"
    }
  ]

  return(
    <>
      <div className="w-full rounded-2xl shadow-sm border border-gray-200 p-4">
        <p className="font-medium text-[14px] leading-4 tracking-[0px] text-[#101828] mb-9">Recent Activity</p>
        {
          activityList.map((activity) => (
            <ActivityComponent
              title={activity.title}
              subTitle={activity.time}
              icon={activity.symbol}
              bgIcon={activity.bgIcon}
            />
          ))
        }
      </div>
    </>
  )
}

export default GuestActivity