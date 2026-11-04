import { Router } from "express";
const router = Router();

import  {productController} from "../controllers/products.controller";

router.get("/allProducts", productController.getAllProducts);
router.post("/product", productController.insertProduct);
router.get("/product/:id", productController.getProductById);
router.put("/product/:id", productController.updateAllById);
router.patch("/product/:id", productController.updateById);
router.delete("/product/:id", productController.deleteById);


export default router;


