import { Router } from "express";
import { CategoryController } from "./category.controller";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { ValidationMiddleware } from "../../middlewares/validation.middleware";
import { createCategorySchema } from "./dto/category_create.schema";

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.post("/", AuthMiddleware.authenticate, ValidationMiddleware.validate(createCategorySchema),categoryController.create)
categoryRouter.get("/", categoryController.findAll);
categoryRouter.get("/getSingle-category/:id", AuthMiddleware.authenticate,categoryController.findById);
categoryRouter.delete("/delete-category/:id", AuthMiddleware.authenticate, categoryController.deleteById);
categoryRouter.put("/update-category", AuthMiddleware.authenticate, categoryController.updateById);

export default categoryRouter;
