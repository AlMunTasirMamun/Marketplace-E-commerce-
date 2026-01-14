import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    searchQuery,
    setSearchQuery,
    cartCount,
    axios,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        setUser(null);
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4">

        {/* LOGO */}
        <Link to="/">
          <h2 className="text-2xl font-bold text-indigo-600">
            IUBAT MARKETPLACE
          </h2>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/">Home</Link>
          <Link to="/products">All Products</Link>

          {/* SEARCH */}
          <div className="hidden lg:flex items-center gap-2 border border-gray-300 px-4 rounded-full">
            <input
              type="text"
              placeholder="Search products"
              className="py-1.5 bg-transparent outline-none text-sm"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path
                d="M10.836 10.615 15 14.695"
                stroke="#7A7B7D"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
                stroke="#7A7B7D"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* CART */}
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 14 14">
              <path
                d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5"
                stroke="#615fff"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute -top-2 -right-3 bg-indigo-500 text-white text-xs w-[18px] h-[18px] flex items-center justify-center rounded-full">
              {cartCount()}
            </span>
          </div>

          {/* USER */}
          {user ? (
            <div className="relative group">
              <img src={assets.profile_icon} alt="" className="w-9 cursor-pointer" />
              <ul className="hidden group-hover:block absolute right-0 top-10 bg-white border shadow rounded-md text-sm w-32">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate("/my-orders")}
                >
                  My Orders
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </li>
              </ul>
            </div>
          ) : (
            <button
              onClick={() => setShowUserLogin(true)}
              className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full"
            >
              Login
            </button>
          )}
        </div>

        {/* MOBILE */}
        <div className="md:hidden flex items-center gap-4">
          <div onClick={() => navigate("/cart")} className="relative">
            <svg width="18" height="18" viewBox="0 0 14 14">
              <path
                d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67"
                stroke="#615fff"
              />
            </svg>
            <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs w-[16px] h-[16px] flex items-center justify-center rounded-full">
              {cartCount()}
            </span>
          </div>

          <button onClick={() => setOpen(!open)}>
            <svg width="22" height="14" viewBox="0 0 22 14">
              <rect width="22" height="2" rx="1" fill="#333" />
              <rect y="6" width="22" height="2" rx="1" fill="#333" />
              <rect y="12" width="22" height="2" rx="1" fill="#333" />
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-3">
          <Link onClick={() => setOpen(false)} to="/">Home</Link>
          <Link onClick={() => setOpen(false)} to="/products">Products</Link>
          {user ? (
            <button onClick={logout} className="block">Logout</button>
          ) : (
            <button onClick={() => setShowUserLogin(true)}>Login</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
