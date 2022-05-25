import mongoose from "mongoose";
import { HealthInfo } from "../interfaces/health/healthInfo";

const HealthSchema = new mongoose.Schema({
  step: {
    count: { type: Number, required: true },
    target: { type: Number, required: true },
    time: { type: Number, required: true },
    activity: { type: Number, required: true },
  },
  calorie: {
    intake: { type: Number, required: true },
    target: { type: Number, required: true },
  },
  sleep: {
    sleepTime: { type: Date, required: true },
    wakeTime: { type: Date, required: true },
  },
  weight: {
    weight: { type: Number },
    fatPercent: { type: Number },
    muscle: { type: Number },
    memo: { type: String }
  },
  water: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<HealthInfo & mongoose.Document>("Health", HealthSchema);
