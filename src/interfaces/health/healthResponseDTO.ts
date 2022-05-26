import { CalorieInfo } from "../calorie/calorieInfo";

export interface healthResponseDTO {
    step: {
        count: number,
        target: number,
        percent: number,
        time: number,
        activity: number   
    };
    calorie: CalorieInfo;
    sleep: {
        hour: number,
        minute: number,
        time: string
    };
    weight?: number;
    water: number;
}