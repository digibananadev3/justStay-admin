import Container from "../../../components/BasicComponent/Container";
import ContactInformation from "./ContactInformation";
import PropertyDetails from "./PropertyDetails";
import LocationAddress from "./LocationAddress";
import PropertyPolicy from "./PropertyPolicy";
import AmenitiesManagement from "./AmenitiesManagement";
import { useProperty } from "../../HotelManagementDrawer";
import { useEffect, useState } from "react";
import EditAmenities from "./EditAmenities";
import { toast } from "react-hot-toast";
import { fetchPropertyById } from "../../../services/properties";

const HotelProfile = () => {
  const context = useProperty();
  const property = context?.property;
  const setProperty = context?.setProperty; // if available

  const [openEdit, setOpenEdit] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);
  const [version, setVersion] = useState(0);
  const [propertyData, setPropertyData] = useState(property);



//   const reloadProperty = async () => {
//   try {

    
//       await fetchPropertyById(property._id); // backend already updated
//   setVersion(v => v + 1); // force rerender
// };
//     const response = await fetchPropertyById(property._id);



//     // YOUR backend shape
//     const updatedProperty =
//       response?.data?.data?.property ||
//       response?.data?.property ||
//       response?.property;

//     if (!updatedProperty || !updatedProperty._id) {
//       console.error("Full response:", response);
//       throw new Error("Invalid property response shape");
//     }

//     setProperty(prev => ({
//       ...prev,
//       ...updatedProperty,
//       propertyAmenities: [...(updatedProperty.propertyAmenities || [])],
//     }));

//     toast.success("Amenities updated successfully");
//   } catch (err) {
//     console.error("Reload property error:", err);
//     toast.error("Failed to refresh property");
//   }
// };


const reloadProperty = async () => {
  try {
    const response = await fetchPropertyById(property._id);
    const updatedProperty = response?.data?.data?.property || response?.data?.property || response?.data || response;
    
    setPropertyData(updatedProperty);
    if (setProperty) {
      setProperty(updatedProperty);
    }
    
    toast.success("Amenities updated successfully");
  } catch (err) {
    toast.error("Failed to refresh property");
  }
};




  if (!context) {
    return (
      <div className="p-5 text-gray-500">No property context available</div>
    );
  }

  if (!property) {
    return <div className="p-5 text-gray-500">Loading property details...</div>;
  }

  return (
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
              coupleFriendly: property?.badges?.coupleFriendly,
              goSafeBadge: property?.badges?.goSafeBadge,
              trainingAndGuidelines: property.trainingAndGuidelines,
              verificationNotes: property.verificationNotes,
            }}
          />
        </Container>
      </div>
      <div>
        <Container
          title={"Property Amenities Management"}
          onEditAmenities={() => setOpenEdit(true)}
        >
          <AmenitiesManagement
  amenities={propertyData?.propertyAmenities || []}
  certification={property.badges || {}}
/>
        </Container>
      </div>

      {/* Edit Modal / Drawer */}
      {openEdit && (
        <EditAmenities
          currentAmenities={propertyData?.propertyAmenities || []}
          propertyId={property?._id}
          onClose={() => setOpenEdit(false)}
          onSuccess={reloadProperty}
        />
      )}
    </>
  );
};

export default HotelProfile;
