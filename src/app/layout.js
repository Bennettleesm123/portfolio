import { Space_Grotesk, Inter } from "next/font/google";
import SchemeSwitcher from "./scheme-switcher";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "Bennett Lee",
  description: "CS student building and training AI systems for real-world impact.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-body antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var s=localStorage.getItem('portfolio-scheme');var ok=['current','paper','fern','gallery','clay','ink'];if(ok.indexOf(s)!==-1)document.documentElement.dataset.scheme=s;}catch(e){}",
          }}
        />
        {children}
        <SchemeSwitcher />
      </body>
    </html>
  );
}
