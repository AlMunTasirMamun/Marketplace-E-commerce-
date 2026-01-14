import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const BACKEND_URL = "http://localhost:5000";

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, cartItems, navigate } = useAppContext();

  if (!product) return null;

  // 🔥 IMAGE HANDLER (frontend + backend)
  const imageSrc =
    typeof product.image?.[0] === "string"
      ? product.image[0].startsWith("http")
        ? product.image[0]
        : product.image[0].startsWith("/")
          ? product.image[0]
          : `${BACKEND_URL}/images/${product.image[0]}`
      : product.image?.[0];

  return (
    <div
      onClick={() => {
        navigate(`/product/${product.category.toLowerCase()}/${product._id}`);
        window.scrollTo(0, 0);
      }}
      className="border border-gray-300 rounded-lg p-4 bg-white w-[220px] cursor-pointer hover:shadow-md transition"
    >
      {/* IMAGE */}
      <div className="flex items-center justify-center h-36 mb-3">
        <img
          src={imageSrc}
          alt={product.name}
          className="max-h-full object-contain"
          onError={(e) => {
            e.target.src = assets.box_icon; // fallback image
          }}
        />
      </div>

      {/* INFO */}
      <p className="text-xs text-gray-400 capitalize">
        {product.category}
      </p>

      <p className="font-semibold text-gray-800 truncate">
        {product.name}
      </p>

      {/* RATING */}
      <div className="flex items-center gap-1 my-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <img
            key={i}
            src={i <= 4 ? assets.star_icon : assets.star_dull_icon}
            className="w-3.5"
          />
        ))}
        <span className="text-xs text-gray-400">(4)</span>
      </div>

      {/* PRICE + CART */}
      <div className="flex justify-between items-center mt-3">
        <p className="text-indigo-600 font-semibold">
          ৳{product.offerPrice}{" "}
          <span className="line-through text-xs text-gray-400">
            ৳{product.price}
          </span>
        </p>

        {!cartItems?.[product._id] ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product._id);
            }}
            className="flex items-center gap-1 border border-indigo-400 px-2 py-1 rounded text-indigo-600 text-sm"
          >
            <img src={assets.cart_icon} className="w-4" />
            Add
          </button>
        ) : (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 bg-indigo-100 px-2 py-1 rounded"
          >
            <button onClick={() => removeFromCart(product._id)}>-</button>
            <span>{cartItems[product._id]}</span>
            <button onClick={() => addToCart(product._id)}>+</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
