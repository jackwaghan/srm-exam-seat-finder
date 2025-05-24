import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { links } from "./utils/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(links.seatfinder),
  title: "SRM Exam Seat Finder",
  keywords: [
    "SRM Seat Finder",
    "SRM Exam Seat Finder",
    "SRMIST Exam Seat Finder",
    "SRM University Exam Seat Finder",
    "SRMIST Seat Finder",
    "SRM University Seat Finder",
    "SRMIST Exam Seat Allocation",
    "SRM University Exam Seat Allocation",
    "SRMIST Seat Allocation",
    "AcademiaX Seat Finder",
    "AcademiaX Exam Seat Finder",
    "AcademiaX Seat Allocation",
  ],
  authors: [{ name: "Jack Waghan A S" }],
  creator: "Jack Waghan A S",
  publisher: "Jack Waghan A S",
  openGraph: {
    title: "SRM Exam Seat Finder",
    description: "Find your Exam Seat Super Fast",
    url: links.seatfinder,
    siteName: "SRM Exam Seat Finder",
    images: [
      {
        url: "/LandingPage.png",
        width: 1200,
        height: 630,
        alt: "SRM Exam Seat Finder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SRM Exam Seat Finder",
    description: "Find your Exam Seat Super Fast",
    images: ["/LandingPage.png"],
    creator: "@jackwaghan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  `}
      >
        {children}
      </body>
    </html>
  );
}
