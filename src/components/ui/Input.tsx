"use client";

import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Reusable text input field supporting labels, error feedback, and helper text.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", id, ...props }, ref) => {
    // Fallback id for label linkage when not explicitly supplied
    const inputId =
      id || (label ? label.toLowerCase().replace(/[^a-z0-9]/g, "-") : undefined);

    const baseInputStyles =
      "w-full px-3 py-2 text-sm text-gray-900 bg-white border rounded-lg transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed";
    const borderStyles = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-400"
      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500";

    const combinedClassName = [baseInputStyles, borderStyles, className]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700 select-none"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={combinedClassName}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
              ? `${inputId}-helper`
              : undefined
          }
          {...props}
        />
        {error ? (
          <p id={`${inputId}-error`} className="text-xs text-red-600 font-medium">
            {error}
          </p>
        ) : helperText ? (
          <p id={`${inputId}-helper`} className="text-xs text-gray-500">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
