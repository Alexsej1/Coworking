import React, { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Info } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CoworkingSpace, BookingFormData } from "./types";

interface BookingFormProps {
  space: CoworkingSpace;
  onSubmitResult: (data: BookingFormData, isSuccess: boolean) => void;
}

export default function BookingForm({
  space,
  onSubmitResult,
}: BookingFormProps) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("1");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!selectedDate) {
      setIsLoading(false);
      return;
    }

    const bookingData = {
      space_id: space.id,
      user_name: userName,
      email,
      phone,
      guests,
      booking_date: selectedDate.toISOString().split("T")[0],
      booking_time: time,
      notes,
    };

    try {
      const response = await fetch("http://localhost:8800/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Ошибка бронирования");
      }

      console.log("Успешное бронирование:", result);
      onSubmitResult(
        {
          ...bookingData,
          date: selectedDate,
        },
        true
      );
    } catch (error) {
      console.error("Ошибка бронирования:", error);
      onSubmitResult(
        {
          ...bookingData,
          date: selectedDate,
        },
        false
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Забронировать место
        </CardTitle>
        <CardDescription>
          Заполните форму, чтобы забронировать место в коворкинге {space.name}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Личные данные */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Личные данные</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Ваше имя</Label>
                <Input
                  id="name"
                  required
                  placeholder="Введите ваше имя"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="Введите адрес эл. почты"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Введите номер мобильного телефона"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests">Количество гостей</Label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger id="guests">
                    <SelectValue placeholder="Выберите количество" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "человек" : "человека"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Дата и время */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Дата и время</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Выбрать дату</Label>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      id="date"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? (
                        selectedDate.toLocaleDateString("ru-RU", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      ) : (
                        <span>Выберите дату</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                        setCalendarOpen(false);
                      }}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Время</Label>
                <Select
                  value={time}
                  onValueChange={(value) => {
                    setTime(value);
                  }}
                >
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Выберите время" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className="space-y-2">
            <Label htmlFor="notes">Дополнительная информация</Label>
            <Textarea
              id="notes"
              placeholder="Укажите особые пожелания или требования..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-24"
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-700">
              <p className="font-medium">Обратите внимание:</p>
              <p>
                Бронирование можно отменить не позднее чем за 24 часа до начала.
                <br />
                Заезд с 8:00, выезд до 22:00.
              </p>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base"
            disabled={isLoading || !selectedDate || !time}
          >
            {isLoading ? "Обработка..." : "Забронировать"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
