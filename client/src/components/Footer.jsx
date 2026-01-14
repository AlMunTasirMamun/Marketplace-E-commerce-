const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 text-gray-600">
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 pt-10 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* BRAND */}
          <div>
            <h1 className="text-xl font-bold text-indigo-600 leading-tight">
              <p className="text-center">IUBAT MARKETPLACE</p>
            </h1>
            <p className="text-xs mt-2 leading-snug">
              <b>
                <p className="text-center">We are committed to delivering the best online shopping
                  experience with IUBAT Marketplace.</p>

              </b>
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-4">
              {["instagram", "facebook", "twitter", "linkedin"].map((item) => (
                <div
                  key={item}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-indigo-500 hover:text-white transition cursor-pointer text-sm"
                >
                  <i className={`fab fa-৳{item}`}></i>
                </div>
              ))}
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <p className="text-sm font-semibold text-gray-900">Company</p>
            <ul className="mt-2 space-y-1 text-xs">
              {["About", "Careers", "Press", "Blog", "Partners"].map((item) => (
                <li
                  key={item}
                  className="hover:text-indigo-500 transition cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <p className="text-sm font-semibold text-gray-900">Support</p>
            <ul className="mt-2 space-y-1 text-xs">
              {[
                "Help Center",
                "Safety Information",
                "Cancellation Options",
                "Contact Us",
                "Accessibility",
              ].map((item) => (
                <li
                  key={item}
                  className="hover:text-indigo-500 transition cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Stay Updated
            </p>
            <p className="text-xs mt-2 leading-snug">
              Subscribe for offers & updates.
            </p>

            <div className="flex items-center mt-3">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-1.5 text-xs rounded-l-full border border-gray-300 outline-none focus:ring-1 focus:ring-indigo-400"
              />
              <button className="px-4 py-1.5 text-xs bg-indigo-500 text-white rounded-r-full hover:bg-indigo-600 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-300" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <p>
            © {new Date().getFullYear()} IUBAT Marketplace. All rights reserved.
          </p>
          <ul className="flex items-center gap-4">
            {["Privacy", "Terms", "Sitemap"].map((item) => (
              <li
                key={item}
                className="hover:text-indigo-500 transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
