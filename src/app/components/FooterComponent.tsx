import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { links } from "../utils/data";

const FooterComponent = () => {
  return (
    <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-fit max-w-2xl">
      <div className="relative bg-white/5 flex items-center justify-between px-3 py-2 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-2xl ">
        <div className="flex gap-3 items-center">
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 border border-white/10 rounded-xl bg-[#232526]/60 text-white hover:bg-[#7fffd4]/20 hover:text-[#7fffd4] transition-colors duration-200 shadow-md"
          >
            <FaGithub size={22} />
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2 border border-white/10 rounded-xl bg-[#232526]/60 text-white hover:bg-[#7fffd4]/20 hover:text-[#7fffd4] transition-colors duration-200 shadow-md"
          >
            <FaLinkedin size={22} />
          </a>
          <a
            href={links.academiaX}
            target="_blank"
            aria-label="AcademiaX"
            className="text-[#7fffd4] p-2 border border-white/10 rounded-xl bg-[#232526]/60  hover:bg-[#7fffd4]/20 hover:text-[#7fffd4] transition-colors duration-200 shadow-md"
          >
            AcademiaX
          </a>
        </div>
        {/* Decorative blurred accent */}
        <div className="absolute inset-0 bg-[#7fffd4]/10 -z-10 blur-2xl rounded-2xl pointer-events-none" />
      </div>
    </footer>
  );
};

export default FooterComponent;
