import { Drawer } from "flowbite-react";
import DrawerTitleComponent from "../components/Drawer/DrawerTitleComponent";
import TabComponent from "../components/BasicComponent/TabComponent";
import { getTabList } from "./HotelTabs/TabList";
import { useQuery } from "@tanstack/react-query";
import { fetchPropertyById } from "../services/properties";
import Loader from "../components/BasicComponent/Loader";
import { createContext, useContext, useMemo } from "react";

// Create context for property data with a default value
const PropertyContext = createContext({ property: null, propertyRooms: [], propertyId: null });

export const useProperty = () => {
  const context = useContext(PropertyContext);
  // Check if context is actually provided (has property or propertyId)
  if (!context || (!context.property && !context.propertyId)) {
    return null;
  }
  return context;
};

const HotelManagementDrawer = ({ isOpen, setIsOpen, propertyId }) => {
  const handleClose = () => setIsOpen(false);

  // Fetch property details when drawer is open and propertyId is available
  const { data: propertyData, isLoading, error, isFetching } = useQuery({
    queryKey: ["property", propertyId],
    queryFn: () => {
      if (!propertyId) {
        throw new Error("Property ID is required");
      }
      return fetchPropertyById(propertyId);
    },
    enabled: !!propertyId && isOpen, // Only fetch when drawer is open and propertyId exists
    retry: 1,
  });

  const property = propertyData?.success ? propertyData.data?.property : null;
  const propertyRooms = propertyData?.success ? propertyData.data?.propertyRoom : [];

  // Debug logging
  console.log("HotelManagementDrawer Debug:", {
    propertyId,
    isOpen,
    isLoading,
    isFetching,
    hasPropertyData: !!propertyData,
    propertyDataSuccess: propertyData?.success,
    property: !!property,
    propertyRooms: propertyRooms?.length
  });

  // Get property name for title
  const propertyName = property?.basicPropertyDetails?.name || "Loading...";

  // Create stable context value using useMemo
  const contextValue = useMemo(() => {
    if (!property) return null;
    return { property, propertyRooms, propertyId };
  }, [property, propertyRooms, propertyId]);

  // Create tab list only when context is available
  const tabList = useMemo(() => {
    if (!property) return null;
    return getTabList();
  }, [property]);

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={handleClose}
        position="right"
        className="w-7/12 bg-white!"
      >
        <DrawerTitleComponent
          title={`Hotel Profile - ${propertyName}`}
          subTitle={"Complete hotel information and activity"}
        />
        {!propertyId ? (
          <div className="p-5 text-gray-500">
            Please select a property to view details
          </div>
        ) : isLoading || isFetching ? (
          <div className="flex items-center justify-center p-8">
            <Loader />
          </div>
        ) : error ? (
          <div className="p-5 text-red-600">
            <p className="font-semibold mb-2">Error loading property</p>
            <p className="text-sm">{error.message || "Failed to load property details"}</p>
            {error.response && (
              <p className="text-xs mt-2 text-gray-500">
                Status: {error.response.status} - {error.response.statusText}
              </p>
            )}
          </div>
        ) : property && contextValue && tabList ? (
          <PropertyContext.Provider value={contextValue}>
            <TabComponent tabSection={tabList} />
          </PropertyContext.Provider>
        ) : propertyData ? (
          <div className="p-5 text-yellow-600">
            <p>Property data received but structure is unexpected.</p>
            <pre className="text-xs mt-2 overflow-auto">{JSON.stringify(propertyData, null, 2)}</pre>
          </div>
        ) : (
          <div className="p-5 text-gray-500">
            No property data available. Please try again.
          </div>
        )}
      </Drawer>
    </>
  );
};

export default HotelManagementDrawer