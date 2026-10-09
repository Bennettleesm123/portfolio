import { IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
});

export const metadata = {
  title: "Bennett Lee",
  description: "CS student building and training AI systems for real-world impact.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${plex.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
