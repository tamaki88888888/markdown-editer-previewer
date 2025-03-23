import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MarkdownEditor from "./pages/markdownEditor";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MarkdownEditor />
  </StrictMode>
);
