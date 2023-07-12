import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { BounceLoader } from "react-spinners";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: existingCategory,
  sizes: existingSizes,
  colors: existingColors,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [desc, setDesc] = useState(existingDescription || "");
  const [category, setCategory] = useState(existingCategory || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const [images, setImages] = useState(existingImages || []);
  const [sizes, setSizes] = useState(existingSizes || []);
  const [colors, setColors] = useState(existingColors || []);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  //Fetch Categories
  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  //Function CreateProduct
  async function createProduct(ev) {
    ev.preventDefault();
    const data = { title, desc, price, images, category, sizes, colors };
    if (_id) {
      //update
      await axios.put("/api/products", { ...data, _id });
    } else {
      //create
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }
  //Upload Poduct Image
  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }

      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }

  //Update Images Order
  function updateImagesOrder(images) {
    setImages(images);
  }

  //Update Sizes
  function updateSizes(ev) {
    setSizes(ev.target.value.split(","));
  }

  function updateColors(ev) {
    setColors(ev.target.value.split(","));
  }

  if (goToProducts) {
    router.push("/products");
  }
  return (
    <form onSubmit={createProduct} className="flex-col flex">
      <label>Product Name</label>
      <input
        type="text"
        placeholder="Product Name"
        onChange={(ev) => setTitle(ev.target.value)}
        value={title}
      ></input>
      <label>Product Category</label>
      <select value={category} onChange={(ev) => setCategory(ev.target.value)}>
        <option value={""}>Uncategorized</option>
        {categories.length > 0 &&
          categories.map((c) => <option value={c._id}>{c.name}</option>)}
      </select>
      <label>Product Photos</label>
      <div className="mb-2 flex flex-wrap gap-2">
        <ReactSortable
          list={images}
          setList={updateImagesOrder}
          className="flex flex-wrap gap-2"
        >
          {!!images?.length &&
            images.map((link) => (
              <div
                className="h-24 border-2 border-gray-200 rounded-sm items-center justify-center"
                key={link}
              >
                <img src={link} alt="" className="rounded-sm" />
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24 p-1 flex rounded-sm items-center">
            <BounceLoader />
          </div>
        )}
        <label className="w-24 h-24 border text-center flex flex-col items-center justify-center text-sm gap-1 text-gray-500 rounded-sm cursor-pointer bg-white border-2 border-emerald-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <input type="file" className="hidden" onChange={uploadImages}></input>
          <div>Add Images</div>
        </label>
      </div>
      <label>Product Description</label>
      <textarea
        placeholder="Description"
        onChange={(ev) => setDesc(ev.target.value)}
        value={desc}
      ></textarea>
      <label>Product Sizes</label>
      <input
        type="text"
        placeholder="Sizes (comma separated)"
        onChange={(ev) => updateSizes(ev)}
        value={sizes}
      />
      <label>Product Colors</label>
      <input
        type="text"
        placeholder="Colors (comma separated)"
        onChange={(ev) => updateColors(ev)}
        value={colors}
      />
      <label>Product Price</label>
      <input
        type="number"
        placeholder="Product Price"
        onChange={(ev) => setPrice(ev.target.value)}
        value={price}
      ></input>
      <button type="submit" className="btn-Primary">
        Save
      </button>
    </form>
  );
}
