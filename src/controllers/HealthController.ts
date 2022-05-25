import express, { Request, Response } from "express";
import { healthCreateDTO } from "../interfaces/health/healthCreateDTO"
import HealthService from "../services/HealthService";
import { success, fail } from "../modules/util"
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage"
import { validationResult } from "express-validator";

/**
 * @route POST /health/weight
 * @desc Create Health
 * @access Public
 */

const createHealth = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(statusCode.BAD_REQUEST).send(fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }
    
    const healthCreateDto: healthCreateDTO = req.body;

    try {
        const data = await HealthService.createHealth(healthCreateDto);
        
        res.status(statusCode.CREATED).send(success(statusCode.CREATED, message.CREATED_HEALTH_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

export default {
    createHealth,
}
