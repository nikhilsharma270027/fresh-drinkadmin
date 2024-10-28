import mongoose, { Model, Schema, Document } from 'mongoose';

// Define the Product interface for TypeScript
interface IProduct extends Document {
  name: string;
  imageurl: string;
  price: number;
}

// Create the Product schema
const productSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  imageurl: { type: String, required: true },
  price: { type: Number, required: true },
});

// Check if the model already exists, to avoid OverwriteModelError
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export default Product;
