// routes/productRoutes.ts
import { Router } from 'express';
import { getProducts, getPrice } from '../controllers/productController';

const router = Router();

router.get('/products', getProducts);
router.get('/price/:user_id/:nombre_producto', getPrice);

export default router;