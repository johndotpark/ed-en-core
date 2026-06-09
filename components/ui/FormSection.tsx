import React from "react";

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export default function FormSection({
  title,
  description,
  children,
  className = "",
}: FormSectionProps) {
  return (
    <div className={`pb-8 border-b border-gray-100 last:border-0 ${className}`}>
      <div className="mb-4">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-1">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}
