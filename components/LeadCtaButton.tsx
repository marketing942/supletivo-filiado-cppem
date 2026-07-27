"use client";

import { useLeadCapture } from "./LeadCapture";

export default function LeadCtaButton({
  message,
  origin,
  className,
  children,
}: {
  message?: string;
  origin?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { openLeadForm } = useLeadCapture();

  return (
    <button
      type="button"
      onClick={() => openLeadForm(message, origin)}
      className={className}
    >
      {children}
    </button>
  );
}
