import ActivityComponent from "../../../components/BasicComponent/ActivityComponent";
import Container from "../../../components/BasicComponent/Container";
import { LuMousePointer } from 'react-icons/lu';
const UsagesTimeLine = () => {
  return(
    <>
      <Container title="Usage Timeline">
        <ActivityComponent
          title="Browsed hotels in Mumbai"
          subTitle="2 hours ago • 15 min"
          icon={<LuMousePointer className='text-[#009689]' />}
        />
      </Container>
    </>
  )
}

export default UsagesTimeLine;