import mermaid from "mermaid";
import { useEffect } from "react";

const fontMono =
  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;";

const Mermaid = ({ diagram }: { diagram: string }) => {
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    mermaid.initialize({
      theme: (isDarkMode ? "dark" : "default") as any,
      fontFamily: fontMono,
    });
    mermaid.contentLoaded();
  }, []);

  return <div className="mermaid">{diagram}</div>;
};

export default Mermaid;
