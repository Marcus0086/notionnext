import React from "react";
import { Poppins } from "next/font/google";

import ThemeProvider from "@/components/themeProvider";
import ToastifyContainer from "@/components/toastifyContainer";

import { cn } from "@/lib/utils";

import "styles/globals.css";
import "katex/dist/katex.min.css";
// import 'prismjs/themes/prism-twilight.min.css'
import "react-notion-x/src/styles.css";
// import 'prismjs/themes/prism-okaidia.css'
// import 'styles/notion.css'
import "styles/prism-theme.css";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="dark"
      style={{
        colorScheme: "dark",
      }}
    >
      <head>
        <script async src="/script.js" />
      </head>
      <body
        className={cn(
          poppins.className,
          "w-full h-screen bg-white dark:bg-navy-900 dark:text-white overflow-auto"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <ToastifyContainer />
      </body>
    </html>
  );
}
