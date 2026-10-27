import express from "express";
import cors from "cors";

import { loggerMiddleware } from "./middlewares/logger.middleware";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import userRouter from "./app/users/user.router";
import authRoute from "./app/auth/auth.route";
import cookieParser from "cookie-parser";
import categoryRouter from "./app/category/category.router";
import productRouter from "./app/products/product.routes";
import productCategoryRouter from "./app/product_category/product_category.router";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import { RegisterRoutes } from "./generated/routes";

export class App {
  public readonly app = express();

  constructor() {
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    const swaggerSpec = JSON.parse(
  fs.readFileSync(path.join(__dirname, "generated/swagger.json"), "utf-8")
);
    this.app.use(cors({
      origin: ["http://192.168.2.48:3000","http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }));
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(loggerMiddleware.handle);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }
  
  private initializeRoutes() {
    this.app.get("/", (_req, res) => {
      res.status(200).json({
        success: true,
        message: "Server is running",
      });
    });

    RegisterRoutes(this.app);
    this.app.use("/api/users", userRouter);
    this.app.use("/api/auth", authRoute);
    this.app.use("/api/category", categoryRouter);
    this.app.use("/api/products", productRouter);
    this.app.use("/api/product_category", productCategoryRouter);
  
  }

  private initializeErrorHandling() {
    this.app.use(notFoundMiddleware.handle);
    this.app.use(errorMiddleware.handle);
  }
}