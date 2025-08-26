import express from "express";
import { GetProductData, AddProduct, UpdateProduct, DeleteProduct } from "../controller/product.controller_new.js";

const router = express.Router();

router.get("/", GetProductData);
router.post("/", AddProduct);
router.put("/:id", UpdateProduct);
router.delete("/:id", DeleteProduct);

export default router;
