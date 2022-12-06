import React from "react";
import ReactDOM from "react-dom";

import { Document, DocumentTitle } from "./ui/Document";


function App() {
    return (
        <Document>
            <DocumentTitle>article title</DocumentTitle>
        </Document>
    );
}

const root = ReactDOM.createRoot(document.getElementById("react-root"));
root.render(<App />);
