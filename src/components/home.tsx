import React, { useState, useEffect } from "react";
import { searchDentists, type PlaceResult } from "@/lib/googlePlaces";
import HeroSection from "./HeroSection";
import SearchResults from "./SearchResults";
import BoroughSection from "./BoroughSection";

interface HomeProps {
  initialSearchTerm?: string;
  initialLocation?: string;
}

const Home = ({
  initialSearchTerm = "",
  initialLocation = "manhattan",
}: HomeProps) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [location, setLocation] = useState(initialLocation);
  const [currentPage, setCurrentPage] = useState(1);
  const [practices, setPractices] = useState<PlaceResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPractices = async () => {
      if (location) {
        setLoading(true);
        try {
          const results = await searchDentists(location, searchTerm);
          setPractices(results);
        } catch (error) {
          console.error("Failed to fetch practices:", error);
          // Provide fallback data if API fails
          setPractices([
            {
              id: "1",
              name: "Dr. Smith Dental Care",
              image:
                "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800",
              rating: 4.5,
              reviewCount: 128,
              location: "Manhattan, NY",
              specialties: ["General Dentistry", "Cosmetic", "Orthodontics"],
              latestReview:
                "Great experience! Very professional and caring staff.",
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
            {
              id: "3",
              name: "Queens Dental Associates",
              image:
                "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800",
              rating: 4.6,
              reviewCount: 156,
              location: "Queens, NY",
              specialties: ["Cosmetic", "Emergency", "Periodontics"],
              latestReview: "Excellent service and very modern facility.",
              phone: "(347) 555-0789",
              coordinates: { lat: 40.7282, lng: -73.7949 },
            },
            {
              id: "4",
              name: "Bronx Family Dentistry",
              image:
                "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800",
              rating: 4.7,
              reviewCount: 112,
              location: "Bronx, NY",
              specialties: ["Family Dentistry", "Orthodontics"],
              latestReview: "Very friendly staff and great with kids!",
              phone: "(718) 555-0321",
              coordinates: { lat: 40.8448, lng: -73.8648 },
            },
          ]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPractices();
  }, [location, searchTerm]);

  const handleSearch = (term: string, loc: string) => {
    setSearchTerm(term);
    setLocation(loc);
    setCurrentPage(1);
  };

  const handleBoroughClick = (borough: string) => {
    setLocation(borough.toLowerCase());
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onSearch={handleSearch} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SearchResults
          practices={practices}
          currentPage={currentPage}
          totalPages={Math.max(1, Math.ceil(practices.length / 8))}
          onPageChange={setCurrentPage}
        />
      </div>

      <BoroughSection onBoroughClick={handleBoroughClick} />
    </div>
  );
};

export default Home;
