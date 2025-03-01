import React, { useState } from "react";
import { Card } from "./ui/card";
import PracticeCard from "./PracticeCard";

interface Location {
  lat: number;
  lng: number;
  name: string;
}

interface MapViewProps {
  locations?: Location[];
  selectedLocation?: Location | null;
  onLocationSelect?: (location: Location) => void;
}

const MapView = ({
  locations = [
    { lat: 40.7128, lng: -74.006, name: "Dr. Smith Dental Care" },
    { lat: 40.7589, lng: -73.9851, name: "Manhattan Dental Specialists" },
    { lat: 40.7484, lng: -73.9857, name: "Empire State Dental" },
  ],
  selectedLocation = null,
  onLocationSelect = () => {},
}: MapViewProps) => {
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);

  // This is a placeholder div that would be replaced with actual Google Maps implementation
  return (
    <div className="relative w-full h-[800px] bg-gray-100 rounded-lg overflow-hidden">
      {/* Placeholder for map */}
      <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800')] bg-cover bg-center">
        {/* Placeholder markers */}
        {locations.map((location, index) => (
          <div
            key={index}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            style={{
              top: `${(location.lat - 40.7) * 1000}px`,
              left: `${(location.lng + 74) * 1000}px`,
            }}
            onMouseEnter={() => setHoveredLocation(location)}
            onMouseLeave={() => setHoveredLocation(null)}
            onClick={() => onLocationSelect(location)}
          >
            <div
              className={`w-6 h-6 bg-primary rounded-full flex items-center justify-center
              ${selectedLocation?.name === location.name ? "ring-4 ring-primary ring-opacity-50" : ""}
              ${hoveredLocation?.name === location.name ? "scale-125" : ""}
              transition-all duration-200`}
            >
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Preview card that appears when hovering over a marker */}
      {hoveredLocation && (
        <div className="absolute top-4 right-4 z-10">
          <PracticeCard name={hoveredLocation.name} />
        </div>
      )}

      {/* Map controls placeholder */}
      <Card className="absolute bottom-4 right-4 p-4 space-y-2 bg-white/90 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded-full" />
          <span className="text-sm">Dental Practice Location</span>
        </div>
        <div className="text-xs text-gray-500">
          Click on a marker to view practice details
        </div>
      </Card>
    </div>
  );
};

export default MapView;
