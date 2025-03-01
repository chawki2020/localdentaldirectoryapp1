import React from "react";
import PracticeCard from "./PracticeCard";
import { Button } from "./ui/button";
import { Pagination } from "./ui/pagination";

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
}

interface PracticeGridProps {
  practices?: Practice[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onPracticeClick?: (practice: Practice) => void;
}

const PracticeGrid = ({
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
    },
  ],
  currentPage = 1,
  totalPages = 5,
  onPageChange = () => {},
  onPracticeClick = () => {},
}: PracticeGridProps) => {
  // Calculate which practices to show based on current page
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedPractices = practices.slice(startIndex, endIndex);

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {displayedPractices.map((practice) => (
          <PracticeCard
            key={practice.id}
            name={practice.name}
            image={practice.image}
            rating={practice.rating}
            reviewCount={practice.reviewCount}
            location={practice.location}
            specialties={practice.specialties}
            latestReview={practice.latestReview}
            phone={practice.phone}
            onClick={() => onPracticeClick(practice)}
          />
        ))}
      </div>
      <div className="mt-8 flex justify-center items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PracticeGrid;
