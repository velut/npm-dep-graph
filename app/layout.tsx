import clsx from "clsx";
import Script from "next/script";
import { darkModeScriptMinified } from "../lib/dark-mode-script";
import "../styles/globals.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
        <Script
          id="dark-mode-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: darkModeScriptMinified }}
        />
      </head>
      <body
        className={clsx(
          "bg-white text-black",
          "dark:bg-neutral-800 dark:text-neutral-100"
        )}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
