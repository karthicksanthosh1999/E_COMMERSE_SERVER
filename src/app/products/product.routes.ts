import { Router } from "express";
import { ProductController } from "./product.controller";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

const productRouter = Router();
const controller = new ProductController();

// Public product endpoints
productRouter.get("/", controller.findAll);
productRouter.get("/:id", controller.findById);
productRouter.post("/filter", controller.filter);

// Admin-only endpoints
productRouter.post("/", AuthMiddleware.authenticate, controller.create);
productRouter.patch("/:id", AuthMiddleware.authenticate, controller.update);
productRouter.delete("/:id", AuthMiddleware.authenticate, controller.delete);

export default productRouter;