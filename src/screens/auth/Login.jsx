import React, { useState } from "react";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function LoginPage() {
  const navigate = useNavigate(); // ✅ Correct naming
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      console.log("Form submitted", formData);
      // ✅ Add login logic or navigate after successful login
      // navigate("/dashboard");
    }
  };

  return (
    <div className="relative h-screen w-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/auth_logo.png')" }}
      />

      {/* Right Login Section */}
      <div className="relative flex justify-end items-center h-full w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-[#194D9A80] backdrop-blur-md text-white shadow-2xl rounded-3xl sm:rounded-[50px] w-full max-w-md sm:max-w-lg p-6 sm:p-12 m-6"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">Log In</h2>

          {/* Email Input */}
          <div className="mb-5">
            <label htmlFor="email" className="text-sm font-medium mb-2 block">
              Email
            </label>
            <div
              className={`flex items-center px-4 py-3 rounded-lg bg-white ${errors.email ? "border border-red-600" : ""
                }`}
            >
              <MdEmail className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
            <p className="text-red-400 text-sm mt-2 min-h-[1.25rem]">
              {errors.email || " "}
            </p>
          </div>

          {/* Password Input */}
          <div className="mb-5">
            <label htmlFor="password" className="text-sm font-medium mb-2 block">
              Password
            </label>
            <div
              className={`flex items-center px-4 py-3 rounded-lg bg-white relative ${errors.password ? "border border-red-600" : ""
                }`}
            >
              <MdLock className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </button>
            </div>
            <p className="text-red-400 text-sm mt-2 min-h-[1.25rem]">
              {errors.password || " "}
            </p>

            {/* ✅ Fixed Forgot Password Navigation */}
            <p
              onClick={() => navigate("/forgot-password")}
              className="text-right text-sm text-[#1AABFE] mt-3 cursor-pointer hover:underline"
            >
              Forgot Password?
            </p>
          </div>

          {/* ✅ Login Button */}
          <button
            type="submit"
            className="w-full bg-[#1AABFE] hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition mt-6 shadow-lg"
          >
            Login
          </button>

          {/* ✅ Create Account Button with Navigation */}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="w-full bg-white hover:bg-gray-100 text-blue-700 font-semibold py-3 rounded-lg mt-4 transition shadow-lg"
          >
            Create Account
          </button>

          {/* ✅ Optional Text Link to Signup */}
          <p className="text-center text-sm mt-6">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-300 cursor-pointer hover:underline font-medium"
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
