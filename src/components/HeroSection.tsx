import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface HeroSectionProps {
  onSearch?: (searchTerm: string, location: string) => void;
  backgroundImage?: string;
}

const HeroSection = ({
  onSearch = () => {},
  backgroundImage = "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=1200",
}: HeroSectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("manhattan");
  return (
    <div className="relative w-full h-[400px] bg-gray-900">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Find Your Perfect Dental Care
        </h1>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl">
          Discover top-rated dentists in New York City. Read reviews, compare
          services, and book appointments easily.
        </p>

        {/* Search Form */}
        <div className="w-full max-w-3xl flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for dentists, specialties, or procedures"
              className="w-full pl-10 h-12 text-lg bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-48 relative">
            <Select defaultValue="manhattan" onValueChange={setLocation}>
              <SelectTrigger className="w-full h-12 bg-white">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <SelectValue placeholder="Select location" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manhattan">Manhattan</SelectItem>
                <SelectItem value="brooklyn">Brooklyn</SelectItem>
                <SelectItem value="queens">Queens</SelectItem>
                <SelectItem value="bronx">Bronx</SelectItem>
                <SelectItem value="staten-island">Staten Island</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            className="h-12 px-8 text-lg"
            onClick={() => onSearch(searchTerm, location)}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
