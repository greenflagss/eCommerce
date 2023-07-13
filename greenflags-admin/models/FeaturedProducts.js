import mongoose, { Schema } from "mongoose";

const FeaturedProductsSchema = new Schema({
  product: { type: mongoose.Types.ObjectId, ref: "Product" },
});

export const Product =
  models.FeaturedProducts || model("FeaturedProducts", FeaturedProductsSchema);
