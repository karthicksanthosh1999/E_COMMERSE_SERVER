import { Router } from "express";
import { ProductCategoryController } from "./product_category.controller";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

const productCategoryRouter = Router();
const productCategoryController = new ProductCategoryController();

productCategoryRouter.get('/', productCategoryController.findAll)
productCategoryRouter.post('/findById', productCategoryController.findById)

productCategoryRouter.post('/', AuthMiddleware.authenticate, productCategoryController.create);
productCategoryRouter.delete('/deleteById', AuthMiddleware.authenticate, productCategoryController.delete);
productCategoryRouter.patch('/updateById', AuthMiddleware.authenticate, productCategoryController.update);

export default productCategoryRouter;