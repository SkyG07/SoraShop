import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useAuthStore();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      toast.success("Account created successfully");
      navigate("/"); // <--- redirect after register
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="card w-96 bg-base-100 shadow-xl p-6 mx-auto mt-20"
    >
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <input
        className="input input-bordered mb-3"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        className="input input-bordered mb-3"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        className="input input-bordered mb-4"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button className="btn btn-primary w-full">Register</button>
    </form>
  );
};

export default Register;
