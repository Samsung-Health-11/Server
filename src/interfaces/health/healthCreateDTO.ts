import { CalorieInfo } from "../calorie/calorieInfo";
import { SleepInfo } from "../sleep/sleepInfo";
import { StepInfo } from "../step/stepInfo";

export interface healthCreateDTO {
    step?: StepInfo;
    calorie?: CalorieInfo;
    sleep?: SleepInfo;
    weight: {
        weight: number;
        fatPercent?: number;
        muscle?: number;
        memo?: number;
    };
    water?: number;
}