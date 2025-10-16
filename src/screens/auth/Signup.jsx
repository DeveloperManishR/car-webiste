import React, { useState } from "react";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff, MdPerson, MdPhone, MdHome, MdLocationOn } from "react-icons/md";
import { z } from "zod";

// Step 1 Schema
const step1Schema = z.object({
  id: z.string().min(1, { message: "ID is required" }),
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  telephone: z.string().min(10, { message: "Telephone must be at least 10 characters" }),
});

// Step 2 Schema
const step2Schema = z.object({
  zipCode: z.string().min(5, { message: "ZIP code must be at least 5 characters" }),
  houseNumber: z.string().min(1, { message: "House number is required" }),
  password: z.string()
    .min(8, { message: "Must be at least 8 characters long" })
    .regex(/[0-9]/, { message: "Must have at least one number" })
    .regex(/[a-z]/, { message: "Must have at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Must have at least one capital letter" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Must have at least one special character" }),
  confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    id: "",
    fullName: "",
    dateOfBirth: "",
    email: "",
    telephone: "",
    zipCode: "",
    houseNumber: "",
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
    const step1Data = {
      id: formData.id,
      fullName: formData.fullName,
      dateOfBirth: formData.dateOfBirth,
      email: formData.email,
      telephone: formData.telephone,
    };

    const result = step1Schema.safeParse(step1Data);

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

  const validateStep2 = () => {
    const step2Data = {
      zipCode: formData.zipCode,
      houseNumber: formData.houseNumber,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    const result = step2Schema.safeParse(step2Data);

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
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      console.log("Form submitted", formData);

      setStep(step + 1)
      // Add your registration logic here
    }
  };

  const handleBack = () => {
    setStep(1);
    setErrors({});
  };

  const passwordRequirements = [
    { met: formData.password.length >= 8, text: "Must be at least 8 characters long" },
    { met: /[0-9]/.test(formData.password), text: "Must have at least one number" },
    { met: /[a-z]/.test(formData.password), text: "Must have at least one lowercase letter" },
    { met: /[A-Z]/.test(formData.password), text: "Must have at least one capital letter" },
    { met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password), text: "Must have at least one special character" },
  ];

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/auth_logo.png')" }}
      />

      {/* Right Registration Section */}
      <div className="relative flex justify-end items-center h-full w-full">
        <div className="bg-[#194D9A80] backdrop-blur-md text-white shadow-2xl rounded-3xl sm:rounded-[50px] w-full max-w-md sm:max-w-lg p-6 sm:p-12 m-6 overflow-y-auto max-h-[95vh]">

          {
            step !== 3 && <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
              Register to you account
            </h2>
          }



          {/* Step 1 Form */}
          {step === 1 && (
            <div>
              {/* ID Input */}
              <div className="mb-5">
                <label htmlFor="id" className="text-sm font-medium mb-2 block">
                  ID
                </label>
                <div
                  className={`flex items-center px-4 py-3 rounded-lg bg-white ${errors.id ? "border border-red-600" : ""
                    }`}
                >
                  <MdPerson className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    name="id"
                    id="id"
                    placeholder="_ _ _ _ _ - _ _"
                    value={formData.id}
                    onChange={handleChange}
                    className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-400"
                  />
                </div>
                <p className="text-red-400 text-sm mt-2 min-h-[1.25rem]">
                  {errors.id || " "}
                </p>
              </div>

              {/* Full Name Input */}
              <div className="mb-5">
                <label htmlFor="fullName" className="text-sm font-medium mb-2 block">
                  Full Name
                </label>
                <div
                  className={`flex items-center px-4 py-3 rounded-lg bg-white ${errors.fullName ? "border border-red-600" : ""
                    }`}
                >
                  <MdPerson className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-400"
                  />
                </div>
                <p className="text-red-400 text-sm mt-2 min-h-[1.25rem]">
                  {errors.fullName || " "}
                </p>
              </div>

              {/* Date of Birth Input */}
              <div className="mb-5">
                <label htmlFor="dateOfBirth" className="text-sm font-medium mb-2 block">
                  Date of birth
                </label>
                <div
                  className={`flex items-center px-4 py-3 rounded-lg bg-white ${errors.dateOfBirth ? "border border-red-600" : ""
                    }`}
                >
                  <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="bg-transparent w-full outline-none text-gray-700"
                  />
                </div>
                <p className="text-red-400 text-sm mt-2 min-h-[1.25rem]">
                  {errors.dateOfBirth || " "}
                </p>
              </div>

              {/* Email Input */}
              <div className="mb-5">
                <label htmlFor="email" className="text-sm font-medium mb-2 block">
                  E-mail
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

              {/* Telephone Input */}
              <div className="mb-5">
                <label htmlFor="telephone" className="text-sm font-medium mb-2 block">
                  Telephone
                </label>
                <div
                  className={`flex items-center px-4 py-3 rounded-lg bg-white ${errors.telephone ? "border border-red-600" : ""
                    }`}
                >
                  <MdPhone className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type="tel"
                    name="telephone"
                    id="telephone"
                    placeholder="(_ _) _ _ _ _ _ - _ _ _ _"
                    value={formData.telephone}
                    onChange={handleChange}
                    className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-400"
                  />
                </div>
                <p className="text-red-400 text-sm mt-2 min-h-[1.25rem]">
                  {errors.telephone || " "}
                </p>
              </div>

              {/* Privacy Notice */}
              <p className="text-xs mb-6 leading-relaxed">
                To offer safer browsing experience tailored to your profile, we record some data
                in your account. This way, you can review your history and information whenever
                you want, in addition to receiving important notifications via email or SMS. Full
                details are available in our{" "}
                <span className="text-[#1AABFE] cursor-pointer hover:underline">Privacy Policy</span>.
              </p>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="w-full bg-[#1AABFE] hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition shadow-lg"
              >
                Follow
              </button>

              <p className="text-center text-xs mt-6">
                <input type="checkbox" className="mr-2" />
                By following, you will accept our{" "}
                <span className="text-[#1AABFE] cursor-pointer hover:underline">terms of use</span>.
              </p>

              <p className="text-center text-sm mt-4">
                Don't have an account yet?{" "}
                <span className="text-[#1AABFE] cursor-pointer hover:underline font-medium">
                  Click Here
                </span>
              </p>
            </div>
          )}

          {/* Step 2 Form */}
          {step === 2 && (
            <div>
              {/* ZIP Code Input */}
              <div className="mb-5">
                <label htmlFor="zipCode" className="text-sm font-medium mb-2 block">
                  ZIP Code
                </label>
                <div
                  className={`flex items-center px-4 py-3 rounded-lg bg-white ${errors.zipCode ? "border border-red-600" : ""
                    }`}
                >
                  <MdLocationOn className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    name="zipCode"
                    id="zipCode"
                    placeholder="_ _ _ _ _ - _ _"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-400"
                  />
                </div>
                <p className="text-red-400 text-sm mt-2 min-h-[1.25rem]">
                  {errors.zipCode || " "}
                </p>
              </div>

              {/* House Number Input */}
              <div className="mb-5">
                <label htmlFor="houseNumber" className="text-sm font-medium mb-2 block">
                  House Number
                </label>
                <div
                  className={`flex items-center px-4 py-3 rounded-lg bg-white ${errors.houseNumber ? "border border-red-600" : ""
                    }`}
                >
                  <MdHome className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    name="houseNumber"
                    id="houseNumber"
                    placeholder="_ _ _ _"
                    value={formData.houseNumber}
                    onChange={handleChange}
                    className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-400"
                  />
                </div>
                <p className="text-red-400 text-sm mt-2 min-h-[1.25rem]">
                  {errors.houseNumber || " "}
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
              </div>

              {/* Confirm Password Input */}
              <div className="mb-5">
                <label htmlFor="confirmPassword" className="text-sm font-medium mb-2 block">
                  Confirm Password
                </label>
                <div
                  className={`flex items-center px-4 py-3 rounded-lg bg-white relative ${errors.confirmPassword ? "border border-red-600" : ""
                    }`}
                >
                  <MdLock className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
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
                <p className="text-red-400 text-sm mt-2 min-h-[1.25rem]">
                  {errors.confirmPassword || " "}
                </p>
              </div>

              {/* Password Requirements */}
              <div className="mb-6 space-y-1">
                {passwordRequirements.map((req, index) => (
                  <p
                    key={index}
                    className={`text-xs flex items-center ${req.met ? "text-green-400" : "text-red-400"
                      }`}
                  >
                    <span className="mr-2">{req.met ? "✓" : "✗"}</span>
                    {req.text}
                  </p>
                ))}
              </div>

              {/* Privacy Notice */}
              <p className="text-xs mb-6 leading-relaxed">
                When you register, we'll use your contact information to send you email and
                WhatsApp promotions, and to send you weekly consultation information for
                the Protected Plate plan. For more information, see our{" "}
                <span className="text-[#1AABFE] cursor-pointer hover:underline">Privacy Policy</span>.
              </p>

              {/* Buttons */}
              <div className="flex gap-4">
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
                  Register
                </button>
              </div>

              <p className="text-center text-xs mt-6">
                By following, you will accept our{" "}
                <span className="text-[#1AABFE] cursor-pointer hover:underline">terms of use</span>.
              </p>

              <p className="text-center text-sm mt-4">
                Don't have an account yet?{" "}
                <span className="text-[#1AABFE] cursor-pointer hover:underline font-medium">
                  Click Here
                </span>
              </p>
            </div>
          )}


          {step === 3 && (
            <div>
              {/* ZIP Code Input */}
              <div className="mb-5">
                <img src="/assets/auth_email.png" />
              </div>



              {/* Privacy Notice */}
              <p className="text-xs mb-6 leading-relaxed">
                We have sent email to <span className="text-[#1AABFE] cursor-pointer hover:underline">jhondoe@gmail.com</span>.to confirm the validity of
                our email address. After receicing the email follow the link provided to
                complete you registration

              </p>


            </div>
          )}
        </div>
      </div>
    </div>
  );
}