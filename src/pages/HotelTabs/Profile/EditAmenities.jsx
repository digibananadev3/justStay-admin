import { useEffect, useState } from "react";
import {
  addAmenitiesInProperty,
  fetchAllAmenities,
} from "../../../services/properties";

/**
 * Create a safe temporary amenity object
 * for amenities that already exist on property
 * but are not returned by API
 */
const normalizeAmenity = (name) => ({
  _id: `existing-${name.replace(/\s+/g, "-").toLowerCase()}`,
  name,
  isExisting: true,
});

const EditAmenities = ({
  onClose,
  currentAmenities = [],
  propertyId,
  onSuccess,
}) => {
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [originalAmenityNames, setOriginalAmenityNames] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadAmenities = async () => {
      setLoading(true);
      try {
        const res = await fetchAllAmenities({ isActive: true });
        const apiAmenities = res.data || [];

        setOriginalAmenityNames([...currentAmenities]);

        const apiAmenityNames = apiAmenities.map((a) => a.name);

        const missingAmenities = currentAmenities
          .filter((name) => !apiAmenityNames.includes(name))
          .map(normalizeAmenity);

        const preSelectedFromApi = apiAmenities.filter((a) =>
          currentAmenities.includes(a.name)
        );

        setAmenities([...apiAmenities, ...missingAmenities]);
        setSelectedAmenities([...preSelectedFromApi, ...missingAmenities]);
      } catch (error) {
        console.error("Failed to fetch amenities", error);
      } finally {
        setLoading(false);
      }
    };

    loadAmenities();
  }, [currentAmenities]);

  const addAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.some((a) => a._id === amenity._id)
        ? prev
        : [...prev, amenity]
    );
  };

  const removeAmenity = (id) => {
    setSelectedAmenities((prev) =>
      prev.filter((a) => a._id !== id)
    );
  };

  const availableAmenities = amenities.filter(
    (a) => !selectedAmenities.some((s) => s._id === a._id)
  );

  const handleSave = async () => {
    try {
      const selectedNames = selectedAmenities.map((a) => a.name);

      const newAmenities = selectedNames.filter(
        (name) => !originalAmenityNames.includes(name)
      );

      if (newAmenities.length === 0) {
        onClose();
        return;
      }

      await addAmenitiesInProperty(propertyId, newAmenities);
      onClose();
      onSuccess?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Manage Amenities
          </h3>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-hidden flex-1">

          {/* Selected Amenities */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Selected Amenities
            </p>

            {selectedAmenities.length === 0 ? (
              <div className="text-sm text-gray-400 italic">
                No amenities selected
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedAmenities.map((amenity) => (
                  <span
                    key={amenity._id}
                    className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm border border-blue-100"
                  >
                    {amenity.name}
                    <button
                      onClick={() => removeAmenity(amenity._id)}
                      className="opacity-60 group-hover:opacity-100 transition hover:text-red-600"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Available Amenities */}
          <div className="flex-1 overflow-y-auto">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Available Amenities
            </p>

            {loading && (
              <div className="text-sm text-gray-500">
                Loading amenities…
              </div>
            )}

            {!loading && availableAmenities.length === 0 && (
              <div className="text-sm text-gray-400 italic">
                All amenities are already added
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableAmenities.map((amenity) => (
                <button
                  key={amenity._id}
                  onClick={() => addAmenity(amenity)}
                  className="px-3 py-2 text-sm text-gray-700 border rounded-lg hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition"
                >
                  {amenity.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end rounded-2xl gap-3 px-6 py-4 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAmenities;
