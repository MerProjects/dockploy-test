import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple Task Manager",
  description: "A simple task management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen`}>
        <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
