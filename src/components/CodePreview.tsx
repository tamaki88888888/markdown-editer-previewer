import { useState } from "react";

export const CodePreview = () => {
  const [code, setCode] = useState("<h1>Hello World</h1>");

  return (
    <div>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} />
      <iframe srcDoc={code} style={{ width: "100%", height: "300px" }} />
    </div>
  );
};
