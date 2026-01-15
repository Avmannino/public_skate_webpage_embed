import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(<App />);

function sendEmbedHeight() {
  const height = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight
  );

  // This is what Wix HTML elements listen for via onMessage(...)
  window.parent?.postMessage({ type: "WINGS_EMBED_HEIGHT", height }, "*");
}

window.addEventListener("load", sendEmbedHeight);
window.addEventListener("resize", sendEmbedHeight);

const ro = new ResizeObserver(() => sendEmbedHeight());
ro.observe(document.documentElement);
