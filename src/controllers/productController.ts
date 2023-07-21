// controllers/productController.ts
import { Request, Response } from 'express';
import Product, { ProductDoc } from '../models/product';

// Route handler for /products
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products: ProductDoc[] = await Product.find({ inStock: true });

    if(products.length === 0){
      res.json({message: 'No products available'})
      return
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'An error ocurred on DB', error });
  }
};

// Route handler for /price/:userId/:nombre_producto
export const getPrice = async (req: Request, res: Response): Promise<void> => {
  const { user_id, nombre_producto } = req.params;

  if(!user_id || !nombre_producto){
    res.status(400).send('<h1>Bad Request</h1><p>Please provide both user_id and nombre_producto in the URL as params.</p>');

  }
  try {
    const product: ProductDoc | null = await Product.findOne({ name: nombre_producto });
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    const basePrice: number = product.price;
    const specialPrice: number | undefined = product.specialPrices?.[user_id];

    const finalPrice: number = specialPrice || basePrice;
    res.json({ price: finalPrice });
  } catch (error) {
    res.status(500).json({ message: 'An error ocurred on DB', error });
  }
};

