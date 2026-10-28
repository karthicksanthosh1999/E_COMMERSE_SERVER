import { Router } from "express";
import { ProductVariantController } from "./product_variant.controller";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

const productVariantRouter = Router();
const productVariantController = new ProductVariantController();

productVariantRouter.get("/", productVariantController.findAll)
productVariantRouter.get("/:id", productVariantController.findById)

productVariantRouter.post("/", AuthMiddleware.authenticate, productVariantController.create)
productVariantRouter.put("/update", AuthMiddleware.authenticate, productVariantController.update)
productVariantRouter.delete("/delete/:id", AuthMiddleware.authenticate, productVariantController.delete)


export default productVariantRouter;