import Container from "../../components/BasicComponent/Container"
import Favorite from "./Favorite/Favorite"
import SearchSaved from "./Favorite/SearchSaved";

const GuestsFavorites = () => {
  return(
    <>
      <Container title={"Favorite Hotels"}>
        <Favorite
          hotelName={"The Grand Oberoi"}
          location={"Mumbai"}
          date={"3 months ago"}
        />
        <Favorite
          hotelName={"The Grand Oberoi"}
          location={"Indore"}
          date={"3 months ago"}
        />
      </Container>
      
      <Container title={"Saved Searches"}>
        <SearchSaved
          hotelName={"Mumbai Weekend Luxury"}
          location={"12 hotels • Updated 1 day ago"}
        />
      </Container>
    </>
  )
}

export default GuestsFavorites