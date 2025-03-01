import React, { useState } from "react";
import PracticeGrid from "./PracticeGrid";
import MapView from "./MapView";
import { Button } from "./ui/button";
import { MapPin, Grid } from "lucide-react";
import PracticeDetails from "./PracticeDetails";

interface Practice {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  specialties: string[];
  latestReview: string;
  phone: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface SearchResultsProps {
  practices?: Practice[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const SearchResults = ({
  practices = [
    {
      id: "1",
      name: "Dr. Smith Dental Care",
      image:
        "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800",
      rating: 4.5,
      reviewCount: 128,
      location: "Manhattan, NY",
      specialties: ["General Dentistry", "Cosmetic", "Orthodontics"],
      latestReview: "Great experience! Very professional and caring staff.",
      phone: "(212) 555-0123",
      coordinates: { lat: 40.7128, lng: -74.006 },
    },
    {
      id: "2",
      name: "Brooklyn Smile Clinic",
      image:
        "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800",
      rating: 4.8,
      reviewCount: 95,
      location: "Brooklyn, NY",
      specialties: ["Family Dentistry", "Pediatric", "Implants"],
      latestReview: "The best dental experience I've ever had!",
      phone: "(718) 555-0456",
      coordinates: { lat: 40.6782, lng: -73.9442 },
    },
  ],
  currentPage = 1,
  totalPages = 5,
  onPageChange = () => {},
}: SearchResultsProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [selectedPractice, setSelectedPractice] = useState<Practice | null>(
    null,
  );
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    name: string;
  } | null>(null);

  const locations = practices.map((practice) => ({
    lat: practice.coordinates?.lat || 40.7128,
    lng: practice.coordinates?.lng || -74.006,
    name: practice.name,
  }));

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end mb-4 gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            onClick={() => setViewMode("grid")}
            className="flex items-center gap-2"
          >
            <Grid className="w-4 h-4" />
            Grid View
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            onClick={() => setViewMode("map")}
            className="flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            Map View
          </Button>
        </div>

        {viewMode === "grid" ? (
          <PracticeGrid
            practices={practices}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            onPracticeClick={setSelectedPractice}
          />
        ) : (
          <MapView
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationSelect={setSelectedLocation}
          />
        )}

        <PracticeDetails
          practice={selectedPractice}
          open={!!selectedPractice}
          onClose={() => setSelectedPractice(null)}
        />
      </div>
    </div>
  );
};

export default SearchResults;
