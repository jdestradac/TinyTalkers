import localFont from "next/font/local";
import "./globals.css";
import SiderBar from "@/components/SideBar/SiderBar";
import SiderBarItem from "@/components/SideBar/SideBarItem";
import { MdHome } from "react-icons/md";
import { SiAlwaysdata } from "react-icons/si";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "TinyTalkers",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#ededed]`}
      >
        <SiderBar />
          
        <main className="flex-1 p-4 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
