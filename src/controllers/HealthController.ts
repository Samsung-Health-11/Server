import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { WeightCreateDTO, HealthResponseDTO } from "../interfaces/health/healthDTO";
import HealthService from "../services/HealthService";
import { success, fail } from "../modules/util";
import sc from "../modules/statusCode";
import rm from "../modules/responseMessage";

/**
 * @route POST /health/weight
 * @desc Create Weight
 * @access Public
 */

const createWeight = async (req: Request, res: Response) => {
  const reqError = validationResult(req);

  if (!reqError.isEmpty()) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));

  const weightCreateDTO: WeightCreateDTO = req.body;

  try {
    await HealthService.createWeight(weightCreateDTO);

    return res.status(sc.CREATED).send(success(sc.CREATED, rm.CREATE_WEIGHT_SUCCESS));
  } catch (error) {
    console.log(error);

    return res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

/**
 * @route GET /health
 * @desc GET Health (By. 채은)
 * @access Public
 */

const getHealth = async (req: Request, res: Response) => {
  try {
    const data: HealthResponseDTO | null = await HealthService.getHealth();
    res.status(sc.OK).send(success(sc.OK, rm.READ_HEALTH_SUCCESS, data));
  } catch (error) {
    console.log(error);
    res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

/**
 * @route GET /health
 * @desc GET Health (By. 희빈)
 * @access Public
 */
const getAllHealth = async (req: Request, res: Response) => {
  try {
    const data = await HealthService.getAllHealth();

    return res.status(sc.OK).send(success(sc.OK, rm.READ_HEALTH_SUCCESS, data));
  } catch (error) {
    console.log(error);

    return res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

export default {
  createWeight,
  getHealth,
  getAllHealth,
};
