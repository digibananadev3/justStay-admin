import Container from "../../../components/BasicComponent/Container";
import { BsSearch, BsCalendar } from 'react-icons/bs';
import { LuWallet, LuStar } from 'react-icons/lu';
import ProgressBar from "../../../components/BasicComponent/ProgressBarComponent";

const UsagesProgress = () => {
  const progressList = [
        { label: "Hotel Search", Icon: BsSearch, percentage: 45, color: "#009689" },
        { label: "Booking Management", Icon: BsCalendar, percentage: 75, color: "#155DFC" },
        { label: "Wallet & Payments", Icon: LuWallet, percentage: 65, color: "#00A63E" },
        { label: "Reviews & Ratings", Icon: LuStar, percentage: 65, color: "#F0B100" },
      ];
  return(
    <>
      <Container title="Most Used Features">
          <div>
            {
              progressList.map((item) => (
                <ProgressBar
                  key={item.label}
                  label={item.label}
                  Icon={item.Icon}
                  percentage={item.percentage}
                  color={item.color}
                />
              ))
            }
          </div>
        </Container>
    </>
  )
}

export default UsagesProgress;