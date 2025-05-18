import React, { useState, useEffect } from "react";
import { YMaps, Map as YandexMap, Placemark } from "react-yandex-maps";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import axios from "axios";

export default function MapPage() {
  const [coworkingSpaces, setCoworkingSpaces] = useState([]);
  const [priceRange, setPriceRange] = useState([1000, 3000]);
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedTypes, setSelectedTypes] = useState({
    "Открытое пространство": false,
    "Частный офис": false,
    "Гибридное пространство": false,
  });
  const [selectedAmenities, setSelectedAmenities] = useState({
    WiFi: false,
    Кофе: false,
    Кухня: false,
    Принтер: false,
    Переговорная: false,
    Парковка: false,
    "24/7": false,
    Ресепшн: false,
    "Событийный зал": false,
  });
  const [filteredSpaces, setFilteredSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Функция для получения данных о коворкингах с сервера
    const fetchCoworkingSpaces = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:8800/spaces");

        const spacesWithCoordinates = response.data.map((space) => ({
          ...space,
          coordinates: [
            parseFloat(space.latitude),
            parseFloat(space.longitude),
          ],
        }));

        setCoworkingSpaces(spacesWithCoordinates);
        setFilteredSpaces(spacesWithCoordinates);
        console.log("Данные о коворкингах получены:", spacesWithCoordinates);
      } catch (err) {
        console.error("Ошибка при получении данных о коворкингах:", err);
        setError(
          "Не удалось загрузить данные о коворкингах. Пожалуйста, попробуйте позже."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoworkingSpaces();
  }, []);

  const applyFilters = () => {
    const types = Object.entries(selectedTypes)
      .filter(([, v]) => v)
      .map(([k]) => k);
    const amenities = Object.entries(selectedAmenities)
      .filter(([, v]) => v)
      .map(([k]) => k);

    const result = coworkingSpaces.filter((space) => {
      const inPrice =
        space.price >= priceRange[0] && space.price <= priceRange[1];
      const inLoc =
        !locationFilter ||
        space.location.toLowerCase().includes(locationFilter.toLowerCase());
      const inType = types.length === 0 || types.includes(space.type);
      const inAmen =
        amenities.length === 0 ||
        amenities.every((a) => space.amenities.includes(a));
      return inPrice && inLoc && inType && inAmen;
    });

    setFilteredSpaces(result);
  };

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-xl font-medium">Загрузка коворкингов...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-lg">
          <svg
            className="h-12 w-12 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="text-xl font-bold mb-2">Ошибка загрузки данных</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} className="w-full">
            Попробовать снова
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen mt-8 bg-gray-50">
      <div className="w-1/4 bg-white p-6 shadow-lg overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Фильтры</h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Стоимость, ₽/день</h3>
          <div className="flex justify-between mb-2 text-sm text-gray-500">
            <span>{priceRange[0]}</span>
            <span>{priceRange[1]}</span>
          </div>
          <Slider
            value={priceRange}
            min={1000}
            max={3000}
            step={100}
            onValueChange={(val) => setPriceRange([val[0], val[1]])}
            className="mb-4"
          />
          <div className="flex gap-2">
            <Input
              type="number"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])
              }
              className="w-1/2"
            />
            <Input
              type="number"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], parseInt(e.target.value) || 0])
              }
              className="w-1/2"
            />
          </div>
        </div>

        <div className="mb-6">
          <Label
            htmlFor="location"
            className="text-lg font-semibold mb-2 block"
          >
            Локация
          </Label>
          <Input
            id="location"
            placeholder="Введите город или адрес"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Тип пространства</h3>
          {Object.keys(selectedTypes).map((type) => (
            <div key={type} className="flex items-center mb-2">
              <Checkbox
                checked={selectedTypes[type]}
                onCheckedChange={() =>
                  setSelectedTypes({
                    ...selectedTypes,
                    [type]: !selectedTypes[type],
                  })
                }
              />
              <Label className="ml-2">{type}</Label>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Удобства</h3>
          <div className="flex flex-wrap gap-2">
            {Object.keys(selectedAmenities).map((amen) => (
              <Badge
                key={amen}
                variant={selectedAmenities[amen] ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() =>
                  setSelectedAmenities({
                    ...selectedAmenities,
                    [amen]: !selectedAmenities[amen],
                  })
                }
              >
                {amen}
              </Badge>
            ))}
          </div>
        </div>

        <Button onClick={applyFilters} className="w-full">
          Применить фильтры
        </Button>
        <p className="mt-4 text-sm text-gray-500">
          Найдено {filteredSpaces.length}
        </p>
      </div>

      <div className="w-3/4 p-6">
        <YMaps query={{ apikey: "____", lang: "ru_RU" }}>
          <YandexMap
            defaultState={{ center: [53.9022, 27.5605], zoom: 13 }}
            width="100%"
            height="100%"
          >
            {filteredSpaces.map((space) => (
              <Placemark
                key={space.id}
                geometry={space.coordinates}
                properties={{ hintContent: space.name }}
                options={{ preset: "islands#blueCircleDotIconWithCaption" }}
                onClick={() => {
                  setSelectedSpace(space);
                  setIsDialogOpen(true);
                }}
              />
            ))}
          </YandexMap>
        </YMaps>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedSpace && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedSpace.name}</DialogTitle>
              <DialogDescription>{selectedSpace.location}</DialogDescription>
            </DialogHeader>
            <img
              src={selectedSpace.image}
              alt=""
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <p className="mb-2">{selectedSpace.description}</p>
            <p className="mb-2">
              <strong>Стоимость:</strong> {selectedSpace.price} ₽/день
            </p>
            <div className="flex flex-wrap gap-1 mb-4">
              {selectedSpace.amenities.map((a) => (
                <Badge key={a} variant="secondary">
                  {a}
                </Badge>
              ))}
            </div>
            <DialogFooter>
              <Button
                className="w-full"
                onClick={() => {
                  setIsDialogOpen(false); // закрываем модалку
                  navigate("/booking", { state: { space: selectedSpace } });
                }}
              >
                Забронировать
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
