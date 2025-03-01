import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MapPin } from "lucide-react";

interface Borough {
  name: string;
  neighborhoods: string[];
  practiceCount: number;
  image: string;
}

interface BoroughSectionProps {
  boroughs?: Borough[];
  onBoroughClick?: (borough: string) => void;
}

const BoroughSection = ({
  boroughs = [
    {
      name: "Manhattan",
      neighborhoods: ["Upper East Side", "Midtown", "Financial District"],
      practiceCount: 245,
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800",
    },
    {
      name: "Brooklyn",
      neighborhoods: ["Williamsburg", "Park Slope", "DUMBO"],
      practiceCount: 189,
      image: "https://images.unsplash.com/photo-1555109307-f7d9da25c244?w=800",
    },
    {
      name: "Queens",
      neighborhoods: ["Astoria", "Long Island City", "Forest Hills"],
      practiceCount: 156,
      image:
        "https://images.unsplash.com/photo-1575578553419-8fa8bf18c40b?w=800",
    },
    {
      name: "Bronx",
      neighborhoods: ["Riverdale", "Pelham Bay", "Fordham"],
      practiceCount: 98,
      image:
        "https://images.unsplash.com/photo-1593534560771-4f0fc0cabd94?w=800",
    },
    {
      name: "Staten Island",
      neighborhoods: ["St. George", "Todt Hill", "Great Kills"],
      practiceCount: 45,
      image:
        "https://images.unsplash.com/photo-1614641845461-c9e088eb05d7?w=800",
    },
  ],
  onBoroughClick = () => {},
}: BoroughSectionProps) => {
  return (
    <section className="w-full bg-white py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Explore by Borough
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boroughs.map((borough) => (
            <Card
              key={borough.name}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={borough.image}
                  alt={borough.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">
                    {borough.name}
                  </h3>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="w-5 h-5" />
                  <span>{borough.practiceCount} dental practices</span>
                </div>
                <div className="space-y-2">
                  {borough.neighborhoods.map((neighborhood) => (
                    <div
                      key={neighborhood}
                      className="text-sm text-gray-600 hover:text-primary cursor-pointer"
                    >
                      {neighborhood}
                    </div>
                  ))}
                </div>
                <Button
                  className="w-full mt-4"
                  onClick={() => onBoroughClick(borough.name)}
                >
                  View All in {borough.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoroughSection;
