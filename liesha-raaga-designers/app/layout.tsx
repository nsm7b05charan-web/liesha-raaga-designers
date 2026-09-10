import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Liesha Raaga Designers | Women's Customized Fashion in Vijayawada",
  description:
    "Liesha Raaga Designers offers customized women's fashion and personalized designs in One Town, Vijayawada, Andhra Pradesh.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}