import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      toast.success("Logged in successfully");
      navigate("/"); // <--- redirect after login
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="card w-96 bg-base-100 shadow-xl p-6 mx-auto mt-20"
    >
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        className="input input-bordered mb-3"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input input-bordered mb-3"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary">Login</button>
    </form>
  );
};

export default Login;
