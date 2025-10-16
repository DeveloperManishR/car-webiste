import React, { useState } from "react";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff, MdNumbers } from "react-icons/md";
import { z } from "zod";

// Step 1 Schema - Email
const step1Schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
});

// Step 2 Schema - OTP
const step2Schema = z.object({
    otp: z.string().min(4, { message: "OTP must be at least 4 digits" }),
});

// Step 3 Schema - Password
const step3Schema = z
    .object({
        password: z
            .string()
            .min(8, { message: "Must be at least 8 characters long" })
            .regex(/[0-9]/, { message: "Must have at least one number" })
            .regex(/[a-z]/, { message: "Must have at least one lowercase letter" })
            .regex(/[A-Z]/, { message: "Must have at least one capital letter" })
            .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Must have at least one special character" }),
        confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export default function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: "",
        otp: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validateStep1 = () => {
        const result = step1Schema.safeParse({ email: formData.email });
        if (!result.success) {
            setErrors({ email: result.error.issues[0].message });
            return false;
        }
        setErrors({});
        return true;
    };

    const validateStep2 = () => {
        const result = step2Schema.safeParse({ otp: formData.otp });
        if (!result.success) {
            setErrors({ otp: result.error.issues[0].message });
            return false;
        }
        setErrors({});
        return true;
    };

    const validateStep3 = () => {
        const result = step3Schema.safeParse({
            password: formData.password,
            confirmPassword: formData.confirmPassword,
        });
        if (!result.success) {
            const fieldErrors = {};
            result.error.issues.forEach((issue) => {
                fieldErrors[issue.path[0]] = issue.message;
            });
            setErrors(fieldErrors);
            return false;
        }
        setErrors({});
        return true;
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (step === 1 && validateStep1()) {
            setStep(2);
        } else if (step === 2 && validateStep2()) {
            setStep(3);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateStep3()) {
            console.log("Password reset successful:", formData);
            alert("Password reset successfully!");
        }
    };

    const handleBack = () => {
        setStep(step - 1);
        setErrors({});
    };

    const passwordRequirements = [
        { met: formData.password.length >= 8, text: "At least 8 characters long" },
        { met: /[0-9]/.test(formData.password), text: "Contains at least one number" },
        { met: /[a-z]/.test(formData.password), text: "Contains at least one lowercase letter" },
        { met: /[A-Z]/.test(formData.password), text: "Contains at least one capital letter" },
        { met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password), text: "Contains at least one special character" },
    ];

    return (
        <div className="relative h-screen w-screen overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/assets/auth_logo.png')" }}
            />

            {/* Form Section */}
            <div className="relative flex justify-end items-center h-full w-full">
                <div className="bg-[#194D9A80] backdrop-blur-md text-white shadow-2xl rounded-3xl w-full max-w-md sm:max-w-lg p-6 sm:p-12 m-6 overflow-y-auto max-h-[95vh]">
                    {/* Title */}
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
                        {step === 1 && "Reset Password"}
                        {step === 2 && "Confirm OTP"}
                        {step === 3 && "New Password"}
                    </h2>

                    {/* Step 1 */}
                    {step === 1 && (
                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <div className={`flex items-center px-4 py-3 rounded-lg bg-white ${errors.email ? "border border-red-600" : ""}`}>
                                <MdEmail className="w-5 h-5 text-gray-400 mr-3" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <p className="text-red-400 text-sm mt-2">{errors.email || " "}</p>

                            <button
                                onClick={handleNext}
                                className="w-full bg-[#1AABFE] hover:bg-blue-500 text-white font-semibold py-3 rounded-lg mt-4 transition shadow-lg"
                            >
                                Send OTP
                            </button>
                        </div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                        <div>
                            <label className="block text-sm font-medium mb-2">Enter OTP</label>
                            <div className={`flex items-center px-4 py-3 rounded-lg bg-white ${errors.otp ? "border border-red-600" : ""}`}>
                                <MdNumbers className="w-5 h-5 text-gray-400 mr-3" />
                                <input
                                    type="text"
                                    name="otp"
                                    placeholder="Enter 6-digit OTP"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <p className="text-red-400 text-sm mt-2">{errors.otp || " "}</p>

                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={handleBack}
                                    className="w-full bg-white hover:bg-gray-100 text-blue-700 font-semibold py-3 rounded-lg transition shadow-lg"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="w-full bg-[#1AABFE] hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition shadow-lg"
                                >
                                    Verify OTP
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3 */}
                    {step === 3 && (
                        <div>
                            {/* Password */}
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <div className={`flex items-center px-4 py-3 rounded-lg bg-white relative ${errors.password ? "border border-red-600" : ""}`}>
                                <MdLock className="w-5 h-5 text-gray-400 mr-3" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="New Password"
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
                            <p className="text-red-400 text-sm mt-2">{errors.password || " "}</p>

                            {/* Confirm Password */}
                            <label className="block text-sm font-medium mb-2 mt-4">Confirm Password</label>
                            <div className={`flex items-center px-4 py-3 rounded-lg bg-white relative ${errors.confirmPassword ? "border border-red-600" : ""}`}>
                                <MdLock className="w-5 h-5 text-gray-400 mr-3" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                </button>
                            </div>
                            <p className="text-red-400 text-sm mt-2">{errors.confirmPassword || " "}</p>

                            {/* Password Requirements */}
                            <div className="mb-4 mt-3 space-y-1">
                                {passwordRequirements.map((req, i) => (
                                    <p key={i} className={`text-xs flex items-center ${req.met ? "text-green-400" : "text-red-400"}`}>
                                        <span className="mr-2">{req.met ? "✓" : "✗"}</span> {req.text}
                                    </p>
                                ))}
                            </div>

                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={handleBack}
                                    className="w-full bg-white hover:bg-gray-100 text-blue-700 font-semibold py-3 rounded-lg transition shadow-lg"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="w-full bg-[#1AABFE] hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition shadow-lg"
                                >
                                    Reset Password
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
