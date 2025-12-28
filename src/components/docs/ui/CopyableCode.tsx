"use client";

import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import CopyIcon from "@/public/icons/copy.svg";
import CheckIcon from "@/public/icons/check.svg";

interface CopyableCodeProps {
  children: ReactNode;
  classes?: string;
}

const extractText = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");

  if (React.isValidElement<{ children?: ReactNode }>(node)) {
    return extractText(node.props.children);
  }

  return "";
};

export const CopyableCode: FC<CopyableCodeProps> = ({ children, classes }) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = async () => {
    const textToCopy = (
      codeRef.current?.textContent ?? extractText(children)
    ).trim();

    if (!textToCopy.trim()) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);

      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl border border-neutral-60 bg-black mt-6 px-6 py-5 font-mono text-sm",
        classes
      )}
    >
      <code
        ref={codeRef}
        className="block text-neutral-10 whitespace-pre overflow-x-auto pr-12"
      >
        {children}
      </code>

      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "absolute right-3 top-3 p-2 rounded transition-colors",
          "hover:bg-neutral-80 active:bg-neutral-70",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black"
        )}
        aria-label={copied ? "Copied!" : "Copy to clipboard"}
        title={copied ? "Copied!" : "Copy to clipboard"}
      >
        {copied ? (
          <CheckIcon className="w-5 h-5 text-neutral-40" />
        ) : (
          <CopyIcon className="w-5 h-5 text-neutral-40" />
        )}
      </button>
    </div>
  );
};
