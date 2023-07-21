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
    res.status(400).send({message: "Please provide both user_id and nombre_producto in the URL as params."});

  }
  try {
    const product: ProductDoc | null = await Product.findOne({ name: nombre_producto });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
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

export const addProduct = async (req: Request, res: Response): Promise<void> => {
  const { name, brand, price, inStock } = req.body;

  // Validate the required fields
  if (!name || !brand || !price || inStock === undefined) {
    res.status(400).json({ message: 'Please provide name, brand, price, and inStock fields for the product.' });
    return;
  }

  try {
    // Check if a product with the same name already exists
    const existingProduct: ProductDoc | null = await Product.findOne({ name });

    if (existingProduct) {
      res.status(409).json({ message: 'A product with the same name already exists.' });
      return;
    }

    // Create a new product instance
    const newProduct: ProductDoc = new Product({
      name,
      brand,
      price,
      inStock,
    });

    // Save the product to the database
    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully.', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error adding the product to the database.', error });
  }
};
