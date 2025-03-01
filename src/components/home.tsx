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
          const results = await searchDentists(location);
          setPractices(results);
        } catch (error) {
          console.error("Failed to fetch practices:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPractices();
  }, [location]);

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
          totalPages={Math.ceil(practices.length / 12)}
          onPageChange={setCurrentPage}
        />
      </div>

      <BoroughSection onBoroughClick={handleBoroughClick} />
    </div>
  );
};

export default Home;
