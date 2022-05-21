import { StepInfo } from "../step/stepInfo";
import { CalorieInfo } from "../calorie/calorieInfo";
import { SleepInfo } from "../sleep/sleepInfo";

export interface HealthInfo {
  step: StepInfo;
  calorie: CalorieInfo;
  sleep: SleepInfo;
  weight: number;
  water: number;
}
