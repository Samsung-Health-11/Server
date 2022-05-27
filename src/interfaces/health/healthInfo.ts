import { StepInfo } from "../step/stepInfo";
import { CalorieInfo } from "../calorie/calorieInfo";
import { SleepInfo } from "../sleep/sleepInfo";
import { WeigthInfo } from "../weight/weightInfo";

export interface HealthInfo {
  step: StepInfo;
  calorie: CalorieInfo;
  sleep: SleepInfo;
  weight: WeigthInfo;
  water: number;
}
