import React from "react";
import { MdEmail, MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { z } from "zod";
import AuthLayout from "../../components/layout/AuthLayout";
import InputField from "../../components/Form/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function LoginPage() {
  const navigate = useNavigate(); // ✅ Correct naming
  const { login } = useAuth();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data) => {
    try {
      await login({ email: data.email, password: data.password });
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <AuthLayout title="Log In">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField
          form={form}
          label="Email"
          name="email"
          placeholder="you@example.com"
          icon={<MdEmail />}
        />

        <InputField
          form={form}
          label="Password"
          name="password"
          placeholder="Password"
          icon={<MdLock />}
          isPassword={true}
          onForgotPassword={() => navigate("/forgot-password")}
        />

        <button
          type="submit"
          className="w-full bg-[#1AABFE] hover:bg-[#1AABFE]/70 text-white font-medium py-3 rounded-md transition mt-2 shadow-lg cursor-pointer"
        >
          Login
        </button>

        <p className="text-center text-[0.8rem] mt-4 md:mt-6">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#1AABFE] cursor-pointer hover:underline font-medium"
          >
            Sign Up
          </span>
        </p>
      </form>
    </AuthLayout>
  );
}
