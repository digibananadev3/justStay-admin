import Container from "../../../components/BasicComponent/Container"
import DeviseInfoCart from "./DeviseInfoCart"

const DeviseInfo = () => {
  return(
    <Container title={"Device & Platform Info"}>
      <div className="grid grid-cols-2 gap-4">
        <DeviseInfoCart
          title={"Devise"}
          info={"iPhone 14 Pro"}
        />
        <DeviseInfoCart
          title={"Devise"}
          info={"iPhone 14 Pro"}
        />

        <DeviseInfoCart
          title={"Devise"}
          info={"iPhone 14 Pro"}
        />
        <DeviseInfoCart
          title={"Devise"}
          info={"iPhone 14 Pro"}
        />
      </div>
    </Container>
  )
}

export default DeviseInfo