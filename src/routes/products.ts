// routes/productRoutes.ts
import { Router } from 'express';
import { getProducts, getPrice, addProduct } from '../controllers/productController';

const router = Router();

router.get('/products', getProducts);
router.get('/price/:user_id/:nombre_producto', getPrice);
router.post('/products/add', addProduct);

export default router;