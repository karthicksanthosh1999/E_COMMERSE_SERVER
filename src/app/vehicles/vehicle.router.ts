import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../db/prisma";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { ApiError } from "../../lib/ApiError";
import { APIResponse } from "../../lib/APIResponse";

const router = Router();
const vehicleSchema = z.object({
  make: z.string().min(1), model: z.string().min(1),
  year: z.number().int().min(1886).optional(), trim: z.string().optional(),
});

router.get("/", async (_req, res) => {
  const vehicles = await prisma.vehicle.findMany({ orderBy: [{ make: "asc" }, { model: "asc" }, { year: "desc" }] });
  res.status(200).json(new APIResponse("Vehicles fetched successfully", 200, vehicles));
});

router.post("/", AuthMiddleware.authenticate, async (req, res) => {
  const parsed = vehicleSchema.safeParse(req.body);
  if (!parsed.success) throw new ApiError(parsed.error.message, 400);
  const vehicle = await prisma.vehicle.create({ data: parsed.data });
  res.status(201).json(new APIResponse("Vehicle created successfully", 201, vehicle));
});

export default router;
