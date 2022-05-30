import dayjs from "dayjs";
import { WeightCreateDTO, HealthResponseDTO, WaterUpdateDTO } from "../interfaces/health/healthDTO";
import { HealthInfo } from "../interfaces/health/healthInfo";
import Health from "../models/Health";

/**
 * @체중_기록
 */
const createWeight = async (weightCreateDTO: WeightCreateDTO) => {
  try {
    await Health.updateOne({ weight: weightCreateDTO });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * @전체_건강_조회
 * @By_채은
 */
const getHealth = async () => {
  try {
    // params를 받는게 아니라서 일단은 하나의 document를 가져오도록
    const health: HealthInfo | null = (await Health.find()).reverse()[0];

    let sleepTime: Date | string = new Date(health.sleep.sleepTime);
    let wakeTime: Date | string = new Date(health.sleep.wakeTime);
    const timeGap = (wakeTime.getTime() - sleepTime.getTime()) / (1000 * 60);

    const amPm = (h: number) => (h < 12 ? "오전 " : "오후 ");
    const timeFormat = (h: any, m: any) => {
      return amPm(h) + [h.toString(), m.toString()].join(":");
    };

    sleepTime = timeFormat(sleepTime.getUTCHours(), sleepTime.getUTCMinutes());
    wakeTime = timeFormat(wakeTime.getUTCHours(), wakeTime.getUTCMinutes());

    const data = {
      step: {
        count: health.step.count,
        target: health.step.target,
        percent: Math.floor((health.step.count * 100) / health.step.target),
        time: health.step.time,
        activity: health.step.activity,
      },
      calorie: {
        intake: health.calorie.intake,
        target: health.calorie.target,
      },
      sleep: {
        hour: Math.floor(timeGap / 60),
        minute: timeGap % 60,
        time: sleepTime + " - " + wakeTime,
      },
      weight: health.weight.weight,
      water: health.water,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * @전체_건강_조회
 * @By_희빈
 */
const getAllHealth = async () => {
  try {
    const health = await Health.findOne();

    if (!health) return null;

    const sleepDate = dayjs(health.sleep.sleepTime);
    const wakeDate = dayjs(health.sleep.wakeTime);
    const sleepTime = wakeDate.diff(sleepDate, "minutes");
    const sleepHour = sleepDate.hour();
    const wakeHour = wakeDate.hour();

    const data: HealthResponseDTO = {
      step: { ...health.step, percent: Math.round(health.step.target / health.step.count) },
      calorie: health.calorie,
      sleep: {
        hour: Math.floor(sleepTime / 60),
        minute: sleepTime % 60,
        time:
          (sleepHour > 12 ? `오후 ${sleepHour - 12}:` : `오전 ${sleepHour}:`) +
          `${sleepDate.minute()} - ` +
          (wakeHour > 12 ? `오후 ${wakeHour - 12}:` : `오전 ${wakeHour}:`) +
          `${wakeDate.minute()}`,
      },
      weight: !health.weight.weight ? null : health.weight.weight,
      water: health.water,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * @마신_물_갱신
 */
const updateWater = async (waterUpdateDTO: WaterUpdateDTO) => {
  try {
    switch (waterUpdateDTO.type) {
      case "+":
        await Health.updateOne({ $inc: { water: 1 } });
        break;
      case "-":
        await Health.updateOne({ $inc: { water: -1 } });
        break;
      default:
        return null;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createWeight,
  getHealth,
  getAllHealth,
  updateWater,
};
