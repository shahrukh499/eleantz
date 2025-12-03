import type { Metadata } from "next";
import { Inter, Kanit } from "next/font/google";
import "./globals.css";
import '@splidejs/react-splide/css';
import 'aos/dist/aos.css';
import Footer from "./components/footer/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Eleantz",
  description: "Eleantz is a platform for creating and managing your team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${inter.variable} ${kanit.variable} antialiased`}
      >
        {children}
        <Footer/>
      </body>
    </html>
  );
}
