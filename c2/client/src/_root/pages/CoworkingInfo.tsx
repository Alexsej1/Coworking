import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Wallet } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CoworkingSpace } from "./types";

interface CoworkingInfoProps {
  space: CoworkingSpace;
  onBackClick: () => void;
}

export default function CoworkingInfo({
  space,
  onBackClick,
}: CoworkingInfoProps) {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "WiFi":
        return "📶";
      case "Кофе":
        return "☕";
      case "Кухня":
        return "🍽️";
      case "Принтер":
        return "🖨️";
      case "Переговорная":
        return "👥";
      case "Парковка":
        return "🚗";
      case "24/7":
        return "🕒";
      case "Ресепшн":
        return "👨‍💼";
      case "Событийный зал":
        return "🎭";
      default:
        return "✓";
    }
  };

  return (
    <Card className="sticky top-8">
      <div className="relative h-56 w-full overflow-hidden rounded-t-lg">
        <img
          src={space.image}
          alt={space.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-white text-black hover:bg-gray-100">
            {space.type}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">{space.name}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-base">
          <MapPin className="h-4 w-4" /> {space.location}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-green-600" />
          <span className="text-xl font-semibold">{space.price} б.р/день</span>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Описание:</h4>
          <p className="text-gray-600">{space.description}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Удобства:</h4>
          <div className="flex flex-wrap gap-2">
            {space.amenities.map((amenity) => (
              <Badge key={amenity} variant="outline" className="bg-gray-50">
                <span className="mr-1">{getAmenityIcon(amenity)}</span>{" "}
                {amenity}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center pt-2">
        <Button variant="outline" onClick={onBackClick} className="w-full">
          Вернуться к карте
        </Button>
      </CardFooter>
    </Card>
  );
}
