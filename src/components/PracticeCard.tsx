import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star, MapPin, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface PracticeCardProps {
  name?: string;
  image?: string;
  rating?: number;
  reviewCount?: number;
  location?: string;
  specialties?: string[];
  latestReview?: string;
  phone?: string;
  onClick?: () => void;
}

const PracticeCard = ({
  name = "Dr. Smith Dental Care",
  image = "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  rating = 4.5,
  reviewCount = 128,
  location = "Manhattan, NY",
  specialties = ["General Dentistry", "Cosmetic", "Orthodontics"],
  latestReview = "Great experience! Very professional and caring staff.",
  phone = "(212) 555-0123",
  onClick = () => {},
}: PracticeCardProps) => {
  return (
    <Card
      className="w-[280px] h-[320px] bg-white overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="p-0">
        <div className="relative h-36 w-full">
          <img src={image} alt={name} className="w-full h-full object-cover" />
          <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-xs text-gray-600">({reviewCount})</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg truncate">{name}</h3>
            <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
              <Phone className="w-4 h-4" />
              <span>{phone}</span>
            </div>
          </div>
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
            />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {specialties.map((specialty, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {specialty}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <p className="text-sm text-gray-600 italic truncate">
          "{latestReview}"
        </p>
      </CardFooter>
    </Card>
  );
};

export default PracticeCard;
