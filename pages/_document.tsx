import { clsx } from "clsx";
import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
import { darkModeScriptMinified } from "../lib/dark-mode-script";

const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body
        className={clsx(
          "bg-white text-black",
          "dark:bg-neutral-800 dark:text-neutral-100"
        )}
      >
        <Main />
        <NextScript />
        <Script
          id="dark-mode-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: darkModeScriptMinified }}
        />
      </body>
    </Html>
  );
};

export default Document;
