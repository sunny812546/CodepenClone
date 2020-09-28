import React, { useState, useEffect } from "react";
import Editor from "./Editor";

const App = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");

  const setLocalStorage = (name, setName) => {
    const localData = localStorage.getItem(name);

    if (localData) {
      setName(JSON.parse(localData));
    }
  };

  // This is for initial useEffects
  useEffect(() => {
    setLocalStorage("htmlData", setHtml);
    setLocalStorage("cssData", setCss);
    setLocalStorage("jsData", setJs);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
      localStorage.setItem("htmlData", JSON.stringify(html));
      localStorage.setItem("cssData", JSON.stringify(css));
      localStorage.setItem("jsData", JSON.stringify(js));
    }, 250);

    return () => {
      clearTimeout(timeout);
    };
  }, [html, css, js]);

  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
};

export default App;
