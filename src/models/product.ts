// models/product.ts
import mongoose from 'mongoose';

export interface ProductDoc extends mongoose.Document {
  name: string;
  brand: string;
  price: number;
  inStock: boolean;
  specialPrices?: {
    [userId: string]: number;
  };
}

const productSchema = new mongoose.Schema<ProductDoc>({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
  specialPrices: { type: Map, of: Number },
});

const Product = mongoose.model<ProductDoc>('Product', productSchema);

export default Product;
