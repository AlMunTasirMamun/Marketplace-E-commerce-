import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Auth = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ MUST be first

    try {
      const payload =
        state === "register"
          ? { name, email, password }
          : { email, password };

      const { data } = await axios.post(`/api/user/${state}`, payload);

      if (data.success) {
        toast.success(data.message || "Success");
        setUser(data.user);
        setShowUserLogin(false);
        navigate("/");
      } else {
        toast.error(data.message || "Failed");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-80 sm:w-[352px] p-8 rounded-lg shadow-xl space-y-4"
      >
        <h2 className="text-2xl font-medium text-center">
          <span className="text-indigo-500">User</span>{" "}
          {state === "login" ? "Login" : "Register"}
        </h2>

        {state === "register" && (
          <div>
            <p>Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full mt-1"
              required
            />
          </div>
        )}

        <div>
          <p>Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full mt-1"
            required
          />
        </div>

        <div>
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mt-1"
            required
          />
        </div>

        <p className="text-sm">
          {state === "register" ? "Already have account?" : "Create an account?"}{" "}
          <span
            onClick={() =>
              setState(state === "register" ? "login" : "register")
            }
            className="text-indigo-500 cursor-pointer"
          >
            click here
          </span>
        </p>

        <button
          type="submit" // ✅ IMPORTANT
          className="bg-indigo-500 hover:bg-indigo-600 text-white w-full py-2 rounded"
        >
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
