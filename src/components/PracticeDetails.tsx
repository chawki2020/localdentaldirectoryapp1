import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Star, MapPin, Phone } from "lucide-react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface PracticeDetailsProps {
  practice?: {
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
  };
  open?: boolean;
  onClose?: () => void;
}

const defaultPractice = {
  name: "Dr. Smith Dental Care",
  image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800",
  rating: 4.5,
  reviewCount: 128,
  location: "Manhattan, NY",
  specialties: ["General Dentistry", "Cosmetic", "Orthodontics"],
  latestReview: "Great experience! Very professional and caring staff.",
  phone: "(212) 555-0123",
  coordinates: {
    lat: 40.7128,
    lng: -74.006,
  },
};

const PracticeDetails = ({
  practice = null,
  open = false,
  onClose = () => {},
}: PracticeDetailsProps) => {
  const displayPractice = practice || defaultPractice;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {displayPractice.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            <div className="relative rounded-lg overflow-hidden h-48 mb-4">
              <img
                src={displayPractice.image}
                alt={displayPractice.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${displayPractice.name}`}
                />
                <AvatarFallback>
                  {displayPractice.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{displayPractice.rating}</span>
                  <span className="text-gray-600">
                    ({displayPractice.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{displayPractice.location}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{displayPractice.phone}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {displayPractice.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="h-[300px] relative rounded-lg overflow-hidden">
            <LoadScript googleMapsApiKey="AIzaSyBGP_BiUn3-uqBsZ1KMteRLfuR5C0AzbSI">
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={
                  displayPractice.coordinates || {
                    lat: 40.7128,
                    lng: -74.006,
                  }
                }
                zoom={15}
              >
                <Marker
                  position={
                    displayPractice.coordinates || {
                      lat: 40.7128,
                      lng: -74.006,
                    }
                  }
                />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PracticeDetails;
