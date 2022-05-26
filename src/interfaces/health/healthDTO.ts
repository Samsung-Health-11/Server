import { CalorieInfo } from "../calorie/calorieInfo";
import { StepInfo } from "../step/stepInfo";

export interface WeightCreateDTO {
  weight: number;
  fatPercent?: number;
  muscle?: number;
  memo?: string;
}

export interface HealthResponseDTO {
  step: StepInfo & { percent: number };
  calorie: CalorieInfo;
  sleep: {
    hour: number;
    minute: number;
    time: string;
  };
  weight: number | null;
  water: number;
}
