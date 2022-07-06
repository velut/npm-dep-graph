import { clsx } from "clsx";
import { Head, Html, Main, NextScript } from "next/document";

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
      </body>
    </Html>
  );
};

export default Document;
