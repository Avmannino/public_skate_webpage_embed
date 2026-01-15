import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(<App />);

// ---- Send the page height to the parent (Wix) so it can resize the iframe ----
// We intentionally use "*" because Wix preview/live origins vary.
// Your Wix embed script already validates event.origin === "https://avmannino.github.io".
function sendEmbedHeight() {
  const height = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight
  );

  window.parent?.postMessage({ type: "WINGS_EMBED_HEIGHT", height }, "*");
}

window.addEventListener("load", sendEmbedHeight);
window.addEventListener("resize", sendEmbedHeight);

const ro = new ResizeObserver(() => sendEmbedHeight());
ro.observe(document.documentElement);
