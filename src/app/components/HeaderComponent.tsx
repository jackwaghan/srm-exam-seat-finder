"use client";
import React, { useState } from "react";
import { IoShareOutline } from "react-icons/io5";
import { IoCopyOutline } from "react-icons/io5";

const HeaderComponent = () => {
  return (
    <div className="w-full mt-4 px-2 lg:px-0 flex justify-center sticky top-2 z-50">
      <div className="relative border-white/10 rounded-2xl items-center px-6 py-3 border shadow-2xl bg-gradient-to-br from-[#232526]/80 to-[#202222]/80 backdrop-blur-2xl flex justify-between max-w-3xl w-full ">
        <h1 className="text-base lg:text-xl font-bold text-white tracking-wide drop-shadow-md select-none">
          <span className="text-[#7fffd4]">AcademiaX</span>
          <span> - Seat Finder</span>
        </h1>
        <div className="flex gap-2">
          <ShareButton />
          <CopyButton />
        </div>
        {/* Decorative blurred accent */}
        <div className="absolute inset-0 bg-[#7fffd4]/20 -z-50 blur-3xl" />
      </div>
    </div>
  );
};

export default HeaderComponent;

const ShareButton = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "AcademiaX - Seat Finder",
          text: "Find your Exam Seat Super Fast",
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or sharing failed
        console.error("Error sharing:", err);
        alert("Sharing failed. Please try copying the link instead.");
      }
    } else {
      // Fallback: copy link to clipboard
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <button
      onClick={handleShare}
      aria-label="Share this page"
      className="p-2 border border-white/10 rounded-xl bg-[#232526]/60 text-white hover:bg-[#7fffd4]/20 hover:text-[#7fffd4] transition-colors duration-200 shadow-md flex items-center gap-2"
    >
      <IoShareOutline size={20} />
    </button>
  );
};

const CopyButton = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy link"
      className={`p-2 border border-white/10 rounded-xl bg-[#232526]/60 text-white hover:bg-[#7fffd4]/20 hover:text-[#7fffd4] transition-colors duration-200 shadow-md flex items-center gap-2 ${
        copied ? "text-[#7fffd4]" : ""
      }`}
    >
      <IoCopyOutline size={20} />
      <span className="sr-only">Copy link</span>
      {copied && (
        <span className="ml-1 text-xs text-[#7fffd4] font-semibold">
          Copied!
        </span>
      )}
    </button>
  );
};
