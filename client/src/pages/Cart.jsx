import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    navigate,
    cartCount,
    totalCartAmount,
    cartItems,
    setCartItems,
    removeFromCart,
    updateCartItem,
    axios,
    user,
    setShowUserLogin,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddress, setShowAddress] = useState(false);

  // ADD ADDRESS
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
  });

  const [paymentOption, setPaymentOption] = useState("COD");

  // ---------------- CART ----------------
  useEffect(() => {
    if (products.length && cartItems) {
      const temp = [];
      for (const key in cartItems) {
        const product = products.find((p) => p._id === key);
        if (product) {
          temp.push({ ...product, quantity: cartItems[key] });
        }
      }
      setCartArray(temp);
    }
  }, [products, cartItems]);

  // ---------------- ADDRESS ----------------
  const getAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddress(data.addresses);
        if (data.addresses.length) {
          setSelectedAddress(data.addresses[0]);
        }
      }
    } catch {
      toast.error("Failed to load address");
    }
  };

  useEffect(() => {
    if (user) getAddress();
  }, [user]);

  const saveAddress = async () => {
    if (!user) {
      toast.error("Please login to add address");
      setShowUserLogin(true);
      return;
    }

    try {
      const { data } = await axios.post("/api/address/add", newAddress);
      if (data.success) {
        toast.success("Address added");
        setShowAddAddressForm(false);
        setNewAddress({ street: "", city: "", state: "", country: "" });
        getAddress();
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Address add failed");
    }
  };

  // ---------------- ORDER ----------------
  const placeOrder = async () => {
    if (!user) {
      toast.error("Please login to place order");
      setShowUserLogin(true);
      return;
    }

    if (!selectedAddress) {
      return toast.error("Please select an address");
    }

    try {
      const { data } = await axios.post("/api/order/cod", {
        items: cartArray.map((i) => ({
          product: i._id,
          quantity: i.quantity,
        })),
        address: selectedAddress._id,
      });

      if (data.success) {
        toast.success(data.message);
        setCartItems({});
        navigate("/my-orders");
      }
    } catch {
      toast.error("Order failed");
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      {/* LEFT CART */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-indigo-500">
            {cartCount()} Items
          </span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 font-medium pb-3">
          <p>Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-[2fr_1fr_1fr] items-center py-4 border-t"
          >
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 border flex items-center justify-center">
                <img
                  src={`http://localhost:5000/images/${product.image[0]}`}
                  alt={product.name}
                  className="max-h-full"
                />
              </div>
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-500">
                  Qty:
                  <select
                    value={cartItems[product._id]}
                    onChange={(e) =>
                      updateCartItem(
                        product._id,
                        Number(e.target.value)
                      )
                    }
                    className="ml-1 outline-none"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </p>
              </div>
            </div>

            <p className="text-center">
              {product.offerPrice * product.quantity}
            </p>

            <button
              onClick={() => removeFromCart(product._id)}
              className="mx-auto"
            >
              ❌
            </button>
          </div>
        ))}

        <button
          onClick={() => navigate("/products")}
          className="mt-6 text-indigo-500 font-medium"
        >
          ← Continue Shopping
        </button>
      </div>

      {/* RIGHT SUMMARY */}
      <div className="w-full md:w-[360px] bg-gray-100 p-5 border mt-10 md:mt-0">
        <h2 className="text-xl font-medium">Order Summary</h2>

        {/* ADDRESS */}
        <p className="mt-4 font-medium">Delivery Address</p>

        <div className="relative mt-2">
          <p className="text-gray-500">
            {selectedAddress
              ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
              : "No Address Found"}
          </p>

          <button
            onClick={() => setShowAddress(!showAddress)}
            className="text-indigo-500 text-sm"
          >
            Change
          </button>

          {showAddress && (
            <div className="absolute bg-white border w-full mt-2 z-10">
              {address.map((a) => (
                <p
                  key={a._id}
                  onClick={() => {
                    setSelectedAddress(a);
                    setShowAddress(false);
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {a.street}, {a.city}
                </p>
              ))}
              <p
                onClick={() => {
                  setShowAddAddressForm(true);
                  setShowAddress(false);
                }}
                className="p-2 text-indigo-500 text-center cursor-pointer"
              >
                Add address
              </p>
            </div>
          )}
        </div>

        {/* ADD ADDRESS FORM */}
        {showAddAddressForm && (
          <div className="mt-4 bg-white border p-3 space-y-2">
            {["street", "city", "state", "country"].map((f) => (
              <input
                key={f}
                placeholder={f}
                value={newAddress[f]}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, [f]: e.target.value })
                }
                className="border p-2 w-full"
              />
            ))}
            <button
              onClick={saveAddress}
              className="w-full bg-indigo-500 text-white py-2"
            >
              Save Address
            </button>
          </div>
        )}

        {/* TOTAL */}
        <div className="mt-6 text-gray-600 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>৳{totalCartAmount()}</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>৳{(totalCartAmount() * 0.02).toFixed(2)}</span>
          </p>
          <p className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>
              ৳{(totalCartAmount() * 1.02).toFixed(2)}
            </span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full mt-6 bg-indigo-500 text-white py-3"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
