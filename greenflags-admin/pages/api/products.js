import { Product } from "@/models/Product";
import mongooseConnect from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);
  //Add Products to the database
  if (method === "POST") {
    const { title, desc, price, images, category, sizes, colors } = req.body;
    const newProduct = Product({
      title: title,
      description: desc,
      price: price,
      images: images,
      category: category,
      sizes: sizes,
      colors: colors,
    });
    const productDoc = await newProduct.save();
    res.json(productDoc);
  }

  //Get All Products
  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }
  //Update Single Product
  if (method === "PUT") {
    const { title, description, price, images, category,sizes, colors, _id } = req.body;
    await Product.updateOne(
      { _id },
      { title, description, price, images, category, sizes, colors }
    );
    res.json(true);
  }

  //Delete Product
  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query.id });
      res.json(true);
    }
  }
}
