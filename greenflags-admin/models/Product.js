import mongoose, { Schema, model, models } from "mongoose";
const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  features: [{ type: String }],
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: mongoose.Types.ObjectId, ref: "Category" },
  colors: [{ type: String }],
  sizes: [{ type: String }],
});
export const Product = models.Product || model("Product", ProductSchema);
