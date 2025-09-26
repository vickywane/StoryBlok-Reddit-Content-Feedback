"use client";

import * as Label from "@radix-ui/react-label";
import { forwardRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface TextInputProps {
  label: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "email" | "password" | "number";
  error?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, id, placeholder, required, type = "text", error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === "password";
    const inputType = isPasswordField ? (showPassword ? "text" : "password") : type;

    return (
      <div className="flex flex-col gap-2">
        <Label.Root
          htmlFor={id}
          className="text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label.Root>
        <div className="relative">
          <input
            {...props}
            ref={ref}
            id={id}
            type={inputType}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              isPasswordField ? "pr-10" : ""
            } ${
              error 
                ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                : "border-gray-300"
            }`}
          />
          {isPasswordField && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="h-5 w-5" />
              ) : (
                <AiOutlineEye className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;