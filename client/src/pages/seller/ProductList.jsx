import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const ProductList = () => {
  const { products, fetchProducts, axios } = useAppContext();

  // TOGGLE STOCK
  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post("/api/product/stock", { id, inStock });
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex-1 py-10 flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>

        <div className="flex flex-col items-center max-w-5xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full">
            <thead className="text-gray-900 text-sm text-left bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold hidden md:block">
                  Price
                </th>
                <th className="px-4 py-3 font-semibold">In Stock</th>
                <th className="px-4 py-3 font-semibold text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-600">
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 flex items-center gap-3">
                    <div className="border rounded p-2">
                      <img
                        src={`http://localhost:5000/images/${product.image[0]}`}
                        alt={product.name}
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                    <span className="truncate max-w-[180px] hidden sm:block">
                      {product.name}
                    </span>
                  </td>

                  <td className="px-4 py-3">{product.category}</td>

                  <td className="px-4 py-3 hidden md:block">
                    ৳{product.offerPrice}
                  </td>

                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={product.inStock}
                        onChange={() =>
                          toggleStock(product._id, !product.inStock)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-checked:bg-indigo-600 rounded-full transition"></div>
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition"></span>
                    </label>
                  </td>


                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <p className="py-6 text-gray-400">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
