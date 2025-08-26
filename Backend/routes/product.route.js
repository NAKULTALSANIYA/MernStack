import express from 'express';
import { GetProductData, AddProduct, DeleteProduct, UpdateProduct } from '../controller/product.controller.js';
const router = express.Router()

router.get('/', GetProductData)
router.post('/', AddProduct)
router.delete('/:id', DeleteProduct)
router.put('/:id', UpdateProduct)

export default router
