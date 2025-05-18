import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, CheckCircle, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { CoworkingSpace, BookingFormData } from "./types";

interface BookingResultDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  status: "success" | "error" | null;
  space: CoworkingSpace;
  formData: BookingFormData | null;
  elapsedSeconds: number | null;
  clickCount: number;
  onSuccessDone: () => void;
}

export default function BookingResultDialog({
  isOpen,
  setIsOpen,
  status,
  space,
  formData,
  elapsedSeconds,
  clickCount,
  onSuccessDone,
}: BookingResultDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle
            className={`text-2xl ${
              status === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status === "success" ? (
              <span className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6" />
                Успешно забронировано!
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <AlertCircle className="h-6 w-6" />
                Ошибка бронирования
              </span>
            )}
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            {status === "success" && formData ? (
              <div className="space-y-2">
                {/* Закомментировано, как в оригинале 
                {status === "success" && elapsedSeconds !== null && (
                  <DialogDescription className="text-center text-sm text-gray-600">
                    Вы оформили бронирование за{" "}
                    <b>
                      {elapsedSeconds} секунд и сделали {clickCount} кликов
                    </b>
                  </DialogDescription>
                )} */}
                <p>
                  Вы забронировали место в коворкинге{" "}
                  <strong>{space.name}</strong>
                </p>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center gap-2 mb-1">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    <span>
                      {formData.date &&
                        formData.date.toLocaleDateString("ru-RU", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{formData.time}</span>
                  </div>
                </div>
                <p className="text-green-600 text-sm">
                  Подтверждение отправлено на ваш email. Приятного пребывания!
                </p>
              </div>
            ) : (
              <div>
                <p>
                  К сожалению, не удалось оформить бронь. Пожалуйста, попробуйте
                  ещё раз.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Возможные причины: временная недоступность сервиса, выбранное
                  время уже занято, проблема с обработкой запроса или
                  использование запрещенных слов в дополнительной информации.
                </p>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          {status === "success" ? (
            <div className="w-full flex flex-col gap-2 sm:flex-row">
              <Button
                variant="outline"
                onClick={() => {
                  setIsOpen(false);
                }}
                className="flex-1"
              >
                Изменить бронь
              </Button>
              <Button
                onClick={() => {
                  setIsOpen(false);
                  onSuccessDone();
                }}
                className="flex-1"
              >
                Вернуться на главную
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => {
                setIsOpen(false);
              }}
              className="w-full"
            >
              Попробовать снова
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
