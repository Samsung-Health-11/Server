import { BaseResponseDTO } from "../interfaces/base/baseDTO"
import { healthCreateDTO } from "../interfaces/health/healthCreateDTO"
import { healthResponseDTO } from "../interfaces/health/HealthResponseDTO";
import { HealthInfo } from "../interfaces/health/healthInfo"
import Health from "../models/Health"

const createHealth = async (healthCreateDto: healthCreateDTO): Promise<BaseResponseDTO> => {
    try {
        const health = new Health({
            step: {
                count: 198,
                target: 1900,
                time: 2,
                activity: 6
            },
            calorie: {
                intake: 0,
                target: 1457
            },
            sleep: {
                sleepTime: "2022-05-31T02:20:00.000+00:00",
                wakeTime: "2022-05-31T09:50:00.000+00:00"
            },
            weight: healthCreateDto.weight,
            water: 0
        });

        await health.save();

        const data = {
            _id: health._id
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getHealth = async () => {
    try {
        // params를 받는게 아니라서 일단은 하나의 document를 가져오도록
        const health: HealthInfo | null = (await Health.find()).reverse()[0]
        
        let sleepTime: Date | string = new Date(health.sleep.sleepTime);
        let wakeTime: Date | string = new Date(health.sleep.wakeTime);
        const timeGap = (wakeTime.getTime() - sleepTime.getTime()) / (1000 * 60);
    
        const amPm = (h: number) => h < 12 ? "오전 " : "오후 ";
        const timeFormat = (h: any, m: any) => { return amPm(h) + [h.toString(), m.toString()].join(':') }
        
        sleepTime = timeFormat(sleepTime.getUTCHours(), sleepTime.getUTCMinutes());
        wakeTime = timeFormat(wakeTime.getUTCHours(), wakeTime.getUTCMinutes());

        const data = {
            step: {
                count: health.step.count,
                target: health.step.target,
                percent: Math.floor(health.step.count*100/health.step.target),
                time: health.step.time,
                activity: health.step.activity
            },
            calorie: {
                intake: health.calorie.intake,
                target: health.calorie.target
            },
            sleep: {
                hour: Math.floor(timeGap / 60),
                minute: timeGap % 60,
                time: sleepTime + ' - ' + wakeTime
            },
            weight: health.weight.weight,
            water: health.water
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    createHealth,
    getHealth
}