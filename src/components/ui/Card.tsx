import React from "react";

export interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
}

/**
 * Reusable Card container component with optional header, subtitle, and action slot.
 */
export function Card({
  title,
  subtitle,
  children,
  className = "",
  headerAction,
}: CardProps) {
  const hasHeader = Boolean(title || headerAction);

  const baseStyles = "bg-white rounded-xl shadow-sm border border-gray-100 p-6";
  const combinedClassName = [baseStyles, className].filter(Boolean).join(" ");

  return (
    <div className={combinedClassName}>
      {hasHeader && (
        <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-gray-50">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          {headerAction && <div className="flex-shrink-0">{headerAction}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
