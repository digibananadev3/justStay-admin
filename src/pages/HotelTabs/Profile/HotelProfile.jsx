import Container from "../../../components/BasicComponent/Container";
import ContactInformation from "./ContactInformation";
import PropertyDetails from "./PropertyDetails";
import LocationAddress from "./LocationAddress";
import PropertyPolicy from "./PropertyPolicy";
import AmenitiesManagement from "./AmenitiesManagement";
import { useProperty } from "../../HotelManagementDrawer";

const HotelProfile = () => {
  const context = useProperty();
  const property = context?.property;

  if (!context) {
    return <div className="p-5 text-gray-500">No property context available</div>;
  }

  if (!property) {
    return <div className="p-5 text-gray-500">Loading property details...</div>;
  }

  return(
    <>
      <div>
        <Container title={"Basic Property Details"}>
          <PropertyDetails 
            hotel={{
              name: property.basicPropertyDetails?.name,
              category: property.propertyType,
              rating: property.rating || 0,
              propertyType: property.propertyListType,
              totalRooms: property.roomCount || 0,
              yearBuilt: property.basicPropertyDetails?.builtYear,
            }} 
          />
        </Container>
      </div>
      <div>
        <Container title={"Contact Information"}>
          <ContactInformation 
            contact={{
              email: property.contactDetails?.email,
              phone: property.contactDetails?.mobile,
              landline: property.contactDetails?.landline,
              owner: property.userId?.phone || "N/A",
            }} 
          />
        </Container>
      </div>
      <div>
        <Container title={"Location & Address"}>
          <LocationAddress 
            location={{
              house: property.location?.house,
              area: property.location?.area,
              pincode: property.location?.pincode,
              city: property.location?.city,
              state: property.location?.state,
              country: property.location?.country,
            }} 
          />
        </Container>
      </div>
      <div>
        <Container title={"Property Description & Policies"}>
          <PropertyPolicy 
            policy={{
              trainingAndGuidelines: property.trainingAndGuidelines,
              verificationNotes: property.verificationNotes,
            }} 
          />
        </Container>
      </div>
      {console.log("This is the value of the property in the HotelProfile component", property)}
      <div>
        <Container title={"Amenities Management"}>
          <AmenitiesManagement 
            amenities={property.propertyAmenities || []} 
            certification={property.badges || {}} 
          />
        </Container>
      </div>
    </>
  )
}

export default HotelProfile;
    