"use client";
import React, { useState } from "react";
import { findSeat } from "../seatfinder";
import { FiLoader } from "react-icons/fi";
import { links } from "../utils/data";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { IoShareOutline } from "react-icons/io5";

type seatType = {
  registerNumber: string;
  venue: string;
  session: string;
  roomNo: string;
  date: string;
  examTime: string;
  seatNo: string;
  speed: string;
};

const MainComponent = () => {
  const [regNo, setRegNo] = useState("");
  const [examDate, setExamDate] = useState<Date | undefined>();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [seatDetails, setSeatDetails] = useState<
    seatType[] | { error: string } | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      registerNumber: regNo.toUpperCase(),
      date: formattedExamDate,
    };
    const response: seatType[] | { error: string } = await findSeat(data);
    setLoading(false);
    if ("error" in response) {
      setError(response.error);
      setSeatDetails(null);
    } else {
      setSeatDetails(response);
      setError(null);
    }
  };

  // When submitting, format examDate as DD/MM/YYYY:
  const formattedExamDate = examDate
    ? `${String(examDate.getDate()).padStart(2, "0")}/${String(
        examDate.getMonth() + 1
      ).padStart(2, "0")}/${examDate.getFullYear()}`
    : "";

  return (
    <div className="flex flex-col items-center pb-44 relative">
      <div className="py-14 lg:py-24 flex flex-col items-center gap-4">
        {/* Modern badge for SRM KTR Students */}
        <div className="flex flex-col lg:flex-row items-center gap-2 ">
          <span className="px-4 py-1 rounded-full bg-[#7fffd4]/10 border border-[#7fffd4]/30 text-[#7fffd4] font-semibold text-xs shadow-md uppercase tracking-widest animate-pulse">
            Only for SRM KTR Students
          </span>
          <button
            className="ml-2 px-3 py-1 rounded-full bg-[#232526]/70 border border-white/10 text-white text-xs font-medium shadow hover:bg-[#7fffd4]/20 hover:text-[#7fffd4] transition"
            disabled
          >
            Coming Soon in AcademiaX v2.0
          </button>
        </div>
        <h1 className="text-4xl md:text-5xl text-center font-extrabold text-white tracking-tight drop-shadow-lg">
          Find Your Exam Seat <span className="text-[#7fffd4]">Super Fast</span>
        </h1>
      </div>
      <div className="relative rounded-3xl p-6 grid grid-cols-1 lg:grid-cols-2 mx-auto lg:w-[60%] w-[95%] bg-[#202222]/80 shadow-2xl">
        <div className="py-10 lg:h-80 bg-transparent rounded-xl p-6 flex flex-col justify-center">
          <form
            className="flex flex-col gap-8 items-center justify-center h-full"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="RA**********"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              className="h-12 px-4 border border-white/10 w-full max-w-md bg-[#232526]/60 backdrop-blur-xl rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7fffd4] transition"
            />
            {/* Shadcn Date Picker */}
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="h-12 px-4 border border-white/10 w-full max-w-md bg-[#232526]/60 backdrop-blur-xl rounded-xl text-left text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7fffd4] transition"
                >
                  {examDate
                    ? format(examDate, "dd/MM/yyyy")
                    : "Exam Date (DD/MM/YYYY)"}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white/5 border border-white/10 text-white rounded-xl shadow-xl backdrop-blur-3xl">
                <Calendar
                  mode="single"
                  selected={examDate}
                  onSelect={(date) => {
                    setExamDate(date);
                    if (date) setPopoverOpen(false); // Close after picking
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <div className="flex items-center justify-center w-full">
              {loading ? (
                <button className="px-4 py-2 bg-white/10 border border-white/10 text-white rounded-full cursor-not-allowed flex items-center gap-2">
                  <FiLoader className="animate-spin" size={20} />
                  <span>Finding...</span>
                </button>
              ) : (
                <button
                  disabled={!regNo || !examDate}
                  type="submit"
                  className="px-6 py-2 bg-[#7fffd4]/10 border border-[#7fffd4]/20 text-[#7fffd4] rounded-full font-semibold shadow-md hover:bg-[#7fffd4]/20 transition disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Find Seat
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="lg:h-80 flex items-center justify-center">
          {!loading && seatDetails ? (
            <SeatInfo seatDetails={seatDetails} />
          ) : (
            <EmptyField error={error} loading={loading} />
          )}
        </div>
        <div className="absolute inset-0 bg-[#7fffd4]/30 -z-50 blur-3xl" />
      </div>
      {/* Built by Jack Waghan footer */}
      <div className=" absolute bottom-32 lg:bottom-10 left-1/2 -translate-x-1/2 w-full flex justify-center ">
        <span className="text-xs text-white/40 font-medium bg-[#232526]/70 px-4 py-1 rounded-full border border-white/10 shadow backdrop-blur-md">
          Built by{" "}
          <a
            href={links.portfolio}
            aria-label="Jack Waghan Portfolio"
            target="_blank"
            className="text-[#7fffd4] underline hover:text-white transition"
          >
            Jack Waghan
          </a>{" "}
          who built{" "}
          <a
            href={links.academiaX}
            aria-label="AcademiaX"
            target="_blank"
            className="text-[#7fffd4] underline hover:text-white transition"
          >
            AcademiaX
          </a>
        </span>
      </div>
    </div>
  );
};

export default MainComponent;

const EmptyField = ({
  error,
  loading,
}: {
  error: string | null;
  loading: boolean;
}) => {
  return (
    <div className="h-full flex items-center justify-center w-full">
      <div className="text-white/50 text-lg text-center">
        {error
          ? error
          : loading
          ? "Looking for your seat..."
          : "Fill the form to find your seat"}
      </div>
    </div>
  );
};

const SeatInfo = ({
  seatDetails,
}: {
  seatDetails: seatType[] | null | { error: string };
}) => {
  if (!seatDetails || "error" in seatDetails) return null;

  const detailsArray = Array.isArray(seatDetails) ? seatDetails : [seatDetails];

  // Share using Web Share API or fallback to copy
  const handleShare = async (seat: seatType) => {
    const shareText = `SRM Exam Seat Details:

Register No: ${seat.registerNumber}
Seat No: ${seat.seatNo}
Venue: ${seat.venue}
Room No: ${seat.roomNo}
Session: ${seat.session}
Exam Date: ${seat.date}
Exam Time: ${seat.examTime}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "AcademiaX - Seat Finder" + ` - ` + ` ${location.href}`,
          text: shareText,
        });
      } catch {
        // User cancelled or sharing failed
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      alert("Seat details copied to clipboard!");
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 animate-fade-in">
      {detailsArray.map((seat, idx) => (
        <div
          key={seat.registerNumber + seat.session + idx}
          className="relative bg-[#232526]/90 border border-white/10 rounded-2xl p-6 shadow-xlflex flex-col  w-full max-w-lg mx-auto glassmorphism"
        >
          {/* Share button at the top right */}

          <button
            onClick={() => handleShare(seat)}
            aria-label="Share seat details"
            className="absolute -top-3 right-0 p-1.5 rounded-lg bg-[#232526]/80 border border-white/10 text-white hover:bg-[#7fffd4]/20 hover:text-[#7fffd4] transition shadow"
          >
            <IoShareOutline size={18} />
          </button>
          <div className="pt-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <span className="text-xs text-white/40">Register No</span>
              <div className="text-lg font-bold text-white tracking-wide">
                {seat.registerNumber}
              </div>
            </div>
            <div>
              <span className="text-xs text-white/40">Seat No</span>
              <div className="text-2xl font-extrabold text-[#7fffd4] tracking-widest">
                {seat.seatNo}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            <Detail label="Venue" value={seat.venue} />
            <Detail label="Room No" value={seat.roomNo} />
            <Detail label="Session" value={seat.session} />
            <Detail label="Exam Date" value={seat.date} />
            <Detail label="Exam Time" value={seat.examTime} />
          </div>
          {/* Speed at bottom right */}
          <div className="absolute right-1 bottom-1">
            <div className="text-xs px-3 py-1 bg-[#7fffd4]/10 border border-[#7fffd4]/20 text-[#7fffd4] rounded-full font-semibold shadow-md flex items-center gap-2">
              <span>🚀</span>
              <span>{seat.speed}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <span className="text-white/40 text-xs">{label}</span>
    <span className="text-white text-base font-medium break-words">
      {value}
    </span>
  </div>
);
