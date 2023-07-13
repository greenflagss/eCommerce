import mongooseConnect from "@/lib/mongoose";
import FeaturedProducts from "../featured";
import {Product} from "@/models/Product";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest();
  if (method === "POST") {
    const FeaturedProduct = new FeaturedProducts({
      product: Product.findOne({ _id: req.body._id }),
    });
    res.json(FeaturedProduct);
  }
}
