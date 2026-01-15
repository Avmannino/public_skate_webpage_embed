import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(<App />);

// ---- Send the page height to the Wix parent so it can resize the iframe ----
// IMPORTANT: set this to your Wix live domain
const WIX_PARENT_ORIGIN = "https://www.wingsarena.com";

function sendEmbedHeight() {
  const height = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight
  );

  window.parent?.postMessage(
    { type: "WINGS_EMBED_HEIGHT", height },
    WIX_PARENT_ORIGIN
  );
}

// Send on load + whenever layout changes
window.addEventListener("load", sendEmbedHeight);
window.addEventListener("resize", sendEmbedHeight);

const ro = new ResizeObserver(() => sendEmbedHeight());
ro.observe(document.documentElement);
