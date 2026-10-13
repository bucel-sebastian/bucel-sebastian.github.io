import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
import Header from "./../components/Header";
import Footer from "./../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        
        <main>
        {children}
        </main>

        {/* No-flash theme resolve: placed AFTER the children so `.home` exists
            when this runs. Static export bakes it into the HTML, so it executes
            before first paint — stored choice → OS preference → light, then
            paints `.home[data-theme]` with the right tokens. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var t=localStorage.getItem("hs-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.querySelector(".home")?.setAttribute("data-theme",t)}catch(e){}',
          }}
        />

        {/* <Footer /> */}
      </body>
    </html>
  );
}
