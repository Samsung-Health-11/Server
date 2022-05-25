import { BaseResponseDTO } from "../interfaces/base/baseDTO"
import { healthCreateDTO } from "../interfaces/health/healthCreateDTO"
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
            water: 2
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

export default {
    createHealth,
}