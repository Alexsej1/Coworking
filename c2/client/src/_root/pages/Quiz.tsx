import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Wifi, Coffee, Printer, Car, Clock, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { coworkingSpaces } from "@/_root/pages/Map";

export default function Quiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    activity: "",
    teamSize: "",
    calls: "",
    budget: 0,
    workStyle: "",
    amenities: [] as string[],
    mobility: "",
    focus: "",
    time: "",
  });
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleChange = (field: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  // Business Suite (id:3) is ideal when:
  // - workStyle is "private"
  // - teamSize is "3–5"
  // - budget >= 2500
  // - amenities include WiFi, Переговорная, Парковка
  // These conditions yield highest score for id 3
  const evaluateScores = () => {
    const scored = coworkingSpaces.map((space) => {
      let score = 0;
      // Match type
      if (answers.workStyle === "private" && space.type === "Частный офис")
        score++;
      // Match team size
      if (answers.teamSize === "3–5" && space.price <= 3000) score++;
      // Budget
      if (space.price <= answers.budget) score++;
      // Calls requirement
      if (
        answers.calls === "Почти весь день" &&
        space.amenities.includes("Переговорная")
      )
        score++;
      // Amenities
      answers.amenities.forEach((a) => {
        if (space.amenities.includes(a)) score++;
      });
      return { ...space, score };
    });
    return scored.sort((a, b) => b.score - a.score).slice(0, 3);
  };

  const next = () => {
    if (step < STEPS.length - 1) setStep((prev) => prev + 1);
    else {
      setResults(evaluateScores());
      setShowResults(true);
    }
  };

  const book = (space: any) => navigate("/booking", { state: { space } });

  const STEPS = [
    {
      title: "Чем вы занимаетесь?",
      render: () => (
        <div className="flex flex-wrap gap-2">
          {["IT", "Дизайн", "Образование", "Бизнес", "Стартап", "Другое"].map(
            (opt) => (
              <Button
                key={opt}
                variant={answers.activity === opt ? "default" : "outline"}
                onClick={() => handleChange("activity", opt)}
              >
                {opt}
              </Button>
            )
          )}
        </div>
      ),
    },
    {
      title: "Размер команды",
      render: () => (
        <div className="flex gap-2">
          {["1–2", "3–5", "более 5"].map((sz) => (
            <Button
              key={sz}
              variant={answers.teamSize === sz ? "default" : "outline"}
              onClick={() => handleChange("teamSize", sz)}
            >
              {sz}
            </Button>
          ))}
        </div>
      ),
    },
    {
      title: "Как часто вы в онлайне?",
      render: () => (
        <RadioGroup
          value={answers.calls}
          onValueChange={(val) => handleChange("calls", val)}
        >
          {["Почти весь день", "Несколько раз в день", "Редко или никогда"].map(
            (opt, i) => (
              <div key={i} className="flex items-center space-x-2">
                <RadioGroupItem id={opt} value={opt} />
                <Label htmlFor={opt}>{opt}</Label>
              </div>
            )
          )}
        </RadioGroup>
      ),
    },
    {
      title: "Ваш бюджет (BYN)",
      render: () => (
        <div>
          <Slider
            max={5000}
            step={100}
            defaultValue={[answers.budget]}
            onValueChange={([v]) => handleChange("budget", v)}
          />
          <div>До {answers.budget} BYN</div>
        </div>
      ),
    },
    {
      title: "Режим работы",
      render: () => (
        <RadioGroup
          value={answers.workStyle}
          onValueChange={(val) => handleChange("workStyle", val)}
        >
          {["Тихо и уединенно", "Открытое общение", "Сбалансированно"].map(
            (opt, i) => (
              <div key={i} className="flex items-center space-x-2">
                <RadioGroupItem
                  id={opt}
                  value={["Тихо и уединенно", "Сбалансированно"][i] || "open"}
                />
                <Label htmlFor={opt}>{opt}</Label>
              </div>
            )
          )}
        </RadioGroup>
      ),
    },
    {
      title: "Удобства",
      render: () => (
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "WiFi", icon: Wifi },
            { label: "Кофе", icon: Coffee },
            { label: "Принтер", icon: Printer },
            { label: "Парковка", icon: Car },
          ].map((a) => (
            <Button
              key={a.label}
              variant={
                answers.amenities.includes(a.label) ? "default" : "outline"
              }
              onClick={() => {
                const arr = answers.amenities.includes(a.label)
                  ? answers.amenities.filter((x) => x !== a.label)
                  : [...answers.amenities, a.label];
                handleChange("amenities", arr);
              }}
            >
              <a.icon size={16} className="mr-2" />
              {a.label}
            </Button>
          ))}
        </div>
      ),
    },
    {
      title: "Насколько важно смена зон?",
      render: () => (
        <RadioGroup
          value={answers.mobility}
          onValueChange={(val) => handleChange("mobility", val)}
        >
          {["Нужна стабильность", "Люблю перемены", "Без разницы"].map(
            (opt, i) => (
              <div key={i} className="flex items-center space-x-2">
                <RadioGroupItem id={`mob-${i}`} value={opt} />
                <Label htmlFor={`mob-${i}`}>{opt}</Label>
              </div>
            )
          )}
        </RadioGroup>
      ),
    },
    {
      title: "Сосредоточенность",
      render: () => (
        <RadioGroup
          value={answers.focus}
          onValueChange={(val) => handleChange("focus", val)}
        >
          {["Только я", "С шумом с наушниками", "Фон не мешает"].map(
            (opt, i) => (
              <div key={i} className="flex items-center space-x-2">
                <RadioGroupItem id={`focus-${i}`} value={opt} />
                <Label htmlFor={`focus-${i}`}>{opt}</Label>
              </div>
            )
          )}
        </RadioGroup>
      ),
    },
    {
      title: "Когда вы работаете?",
      render: () => (
        <div className="flex gap-2">
          {["Утро", "День", "Вечер", "Ночь"].map((t) => (
            <Button
              key={t}
              variant={answers.time === t ? "default" : "outline"}
              onClick={() => handleChange("time", t)}
            >
              {t}
            </Button>
          ))}
        </div>
      ),
    },
    {
      title: "Подтвердите выбор",
      render: () => (
        <div>Нажмите «Показать результаты» для окончательного подбора.</div>
      ),
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-6"
      >
        <Card className="rounded-2xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-center">
              Шаг {step + 1} из {STEPS.length}
              <div className="mt-1 text-sm text-gray-500">
                {STEPS[step].title}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>{STEPS[step].render()}</CardContent>
          <div className="flex justify-between p-4">
            <Button
              variant="outline"
              disabled={step === 0}
              onClick={() => setStep((prev) => prev - 1)}
            >
              Назад
            </Button>
            <Button onClick={next}>
              {step === STEPS.length - 1 ? "Показать результаты" : "Далее"}
            </Button>
          </div>
        </Card>
      </motion.div>
      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Топ-3 пространства</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {results.map((space, idx) => (
              <motion.div
                key={space.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="flex justify-between p-3 bg-white rounded-lg"
              >
                <div>
                  <strong>
                    {idx + 1}. {space.name}
                  </strong>
                  <div>Совпадение: {space.score}</div>
                </div>
                <Button size="sm" onClick={() => book(space)}>
                  Забронировать
                </Button>
              </motion.div>
            ))}
            <DialogFooter>
              <Button
                variant="default"
                className="w-full"
                onClick={() => book(results[0])}
              >
                Забронировать лучший
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
