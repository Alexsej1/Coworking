import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTimer } from "@/components/shared/TimerContext";
import CoworkingInfo from "./CoworkingInfo";
import BookingForm from "./BookingForm";
import BookingResultDialog from "./BookingResultDialog";
import { CoworkingSpace, BookingFormData } from "./types";

interface LocationState {
  space?: CoworkingSpace;
}

export default function Booking() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { space } = state as LocationState;
  const [elapsedSeconds, setElapsedSeconds] = useState<number | null>(null);
  const { getElapsed, clickCount } = useTimer();

  // Если нет данных о выбранном пространстве, возвращаем на главную
  if (!space) {
    navigate("/");
    return null;
  }

  // Состояния для диалогового окна
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<
    "success" | "error" | null
  >(null);

  // Данные формы для передачи в диалог при успешном бронировании
  const [formData, setFormData] = useState<BookingFormData | null>(null);

  const handleBookingSubmit = (data: BookingFormData, isSuccess: boolean) => {
    if (isSuccess) {
      const elapsedMs = getElapsed();
      const seconds = Math.floor(elapsedMs / 1000);
      setElapsedSeconds(seconds);
      console.log(
        `Пользователь бронировал через ${seconds} секунд и сделал ${clickCount} кликов`
      );
      setBookingStatus("success");
      setFormData(data);
    } else {
      setBookingStatus("error");
    }

    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Информация о коворкинге */}
          <div className="w-full lg:w-1/3">
            <CoworkingInfo space={space} onBackClick={() => navigate("/map")} />
          </div>

          {/* Форма бронирования */}
          <div className="w-full lg:w-2/3">
            <BookingForm space={space} onSubmitResult={handleBookingSubmit} />
          </div>
        </div>
      </div>

      {/* Диалоговое окно результата */}
      <BookingResultDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        status={bookingStatus}
        space={space}
        formData={formData}
        elapsedSeconds={elapsedSeconds}
        clickCount={clickCount}
        onSuccessDone={() => navigate("/")}
      />
    </div>
  );
}
