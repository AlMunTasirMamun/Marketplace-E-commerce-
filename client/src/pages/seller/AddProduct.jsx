import { assets, categories } from "../../assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const { axios, fetchProducts, navigate } = useContext(AppContext); // ✅ ADD fetchProducts
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("offerPrice", offerPrice);

      files.forEach((file) => {
        if (file) formData.append("image", file);
      });

      const { data } = await axios.post(
        "/api/product/add-product",
        formData
      );

      if (data.success) {
        toast.success("Product added successfully");

        // ✅ RESET FORM
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setFiles([]);

        // ✅ THIS IS THE KEY FIX
        await fetchProducts();            // refresh product list
        navigate("/seller/products");     // go to product list
      } else {
        toast.error(data.message, { icon: null });
      }
    } catch (error) {
      toast.error(error.message, { icon: null });
    }
  };

  return (
    <div className="py-10 bg-white">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    id={`image${index}`}
                    onChange={(e) => {
                      const updated = [...files];
                      updated[index] = e.target.files[0];
                      setFiles(updated);
                    }}
                  />
                  <img
                    src={
                      files[index]
                        ? URL.createObjectURL(files[index])
                        : assets.upload_area
                    }
                    alt="upload"
                    className="max-w-24 cursor-pointer"
                  />
                </label>
              ))}
          </div>
        </div>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          required
          className="border p-2 w-full rounded"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product Description"
          className="border p-2 w-full rounded"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="border p-2 w-full rounded"
        >
          <option value="">Select Category</option>
          {categories.map((c, i) => (
            <option key={i} value={c.path}>
              {c.path}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
          className="border p-2 w-full rounded"
        />

        <input
          type="number"
          value={offerPrice}
          onChange={(e) => setOfferPrice(e.target.value)}
          placeholder="Offer Price"
          required
          className="border p-2 w-full rounded"
        />

        <button className="bg-indigo-500 text-white px-8 py-2 rounded">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
