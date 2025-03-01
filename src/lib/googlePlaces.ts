import { Loader } from "@googlemaps/js-api-loader";

const GOOGLE_MAPS_API_KEY = "AIzaSyBGP_BiUn3-uqBsZ1KMteRLfuR5C0AzbSI";

const loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  version: "weekly",
  libraries: ["places"],
});

export interface PlaceResult {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  specialties: string[];
  latestReview?: string;
  phone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const searchDentists = async (
  location: string,
): Promise<PlaceResult[]> => {
  await loader.load();
  const service = new google.maps.places.PlacesService(
    document.createElement("div"),
  );

  const request = {
    query: `dentist in ${location}`,
    fields: [
      "name",
      "geometry",
      "formatted_address",
      "rating",
      "user_ratings_total",
      "photos",
      "place_id",
      "formatted_phone_number",
    ],
  };

  return new Promise((resolve, reject) => {
    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const places = results.map(async (place) => {
          // Get additional details for each place
          const details = await new Promise((resolveDetails) => {
            service.getDetails(
              {
                placeId: place.place_id,
                fields: ["formatted_phone_number", "reviews"],
              },
              (placeDetails) => resolveDetails(placeDetails),
            );
          });

          return {
            id: place.place_id,
            name: place.name,
            image:
              place.photos?.[0]?.getUrl() ||
              "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800",
            rating: place.rating || 0,
            reviewCount: place.user_ratings_total || 0,
            location: place.formatted_address,
            specialties: ["General Dentistry"], // Default specialty
            latestReview: details?.reviews?.[0]?.text || "",
            phone: details?.formatted_phone_number || "",
            coordinates: {
              lat: place.geometry?.location?.lat() || 0,
              lng: place.geometry?.location?.lng() || 0,
            },
          };
        });

        Promise.all(places).then(resolve);
      } else {
        reject(new Error("Places search failed"));
      }
    });
  });
};
