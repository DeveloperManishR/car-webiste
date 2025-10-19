import React, { useEffect, useState } from "react";
import { MdLock } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import AuthLayout from "../../components/layout/AuthLayout";
import InputField from "../../components/Form/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Password Schema
const passwordSchema = z
  .object({
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(8, { message: "Must be at least 8 characters long" })
      .regex(/[0-9]/, { message: "Must have at least one number" })
      .regex(/[a-z]/, { message: "Must have at least one lowercase letter" })
      .regex(/[A-Z]/, { message: "Must have at least one capital letter" })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Must have at least one special character",
      }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tokenValid, setTokenValid] = useState(false);
  const [loading, setLoading] = useState(true);

  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      alert("Invalid reset link. Please request a new password reset.");
      navigate("/forgot-password");
      return;
    }

    // Here you would validate the token with your backend
    // For now, we'll simulate a token validation
    const validateToken = async () => {
      try {
        // Simulate API call to validate token
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // In a real app, you would check if the token is valid and not expired
        // const response = await fetch(`/api/validate-reset-token?token=${token}`);
        // const isValid = await response.json();

        setTokenValid(true); // For demo purposes, always set to true
      } catch (error) {
        console.error("Token validation failed:", error);
        alert(
          "Invalid or expired reset link. Please request a new password reset."
        );
        navigate("/forgot-password");
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [searchParams, navigate]);

  const handleSubmit = async (data) => {
    const token = searchParams.get("token");

    try {
      console.log("Resetting password with token:", token);
      console.log("New password:", data.password);

      // Here you would send the new password and token to your backend
      // const response = await fetch("/api/reset-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ token, password: data.password })
      // });

      alert("Password reset successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Password reset failed:", error);
      alert("Password reset failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <AuthLayout title="Validating Reset Link">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Validating reset link...</p>
        </div>
      </AuthLayout>
    );
  }

  if (!tokenValid) {
    return (
      <AuthLayout title="Invalid Reset Link">
        <div className="text-center">
          <p className="text-white mb-4">Invalid or expired reset link.</p>
          <button
            onClick={() => navigate("/forgot-password")}
            className="w-full bg-[#1AABFE] hover:bg-[#1AABFE]/70 text-white font-medium py-3 rounded-md transition shadow-lg cursor-pointer"
          >
            Request New Reset Link
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Reset Password">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField
          form={form}
          label="New Password"
          name="password"
          placeholder="Enter new password"
          icon={<MdLock />}
          isPassword={true}
        />

        <InputField
          form={form}
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm new password"
          icon={<MdLock />}
          isPassword={true}
        />

        <button
          type="submit"
          className="w-full bg-[#1AABFE] hover:bg-[#1AABFE]/70 text-white font-medium py-3 rounded-md transition mt-2 shadow-lg cursor-pointer"
        >
          Reset Password
        </button>

        <p className="text-center text-[0.8rem] mt-4 md:mt-3">
          Remember your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#1AABFE] cursor-pointer hover:underline font-medium"
          >
            Log In
          </span>
        </p>
      </form>
    </AuthLayout>
  );
}
