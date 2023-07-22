// routes/productRoutes.ts
import { Router } from 'express';
import { getProducts, getPrice, addProduct, setSpecialPrice } from '../controllers/productController';

const router = Router();

// Get routes
router.get('/products', getProducts);
router.get('/price/:user_id/:nombre_producto', getPrice);

// Post routes
router.post('/products/add', addProduct);
router.post('/products/special_price', setSpecialPrice);

export default router;