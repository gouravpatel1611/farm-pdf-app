import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function DownloadPage() {
  const location = useLocation();
  const pdfUrl = location.state?.pdfUrl;

  // Optional: auto-download PDF on page load
  useEffect(() => {
    if (pdfUrl) {
      // Uncomment below line to auto-download
      // window.location.href = pdfUrl;
    }
  }, [pdfUrl]);

  if (!pdfUrl) return <div className="container"><h2>No PDF URL found!</h2></div>;

  return (
    <div className="container" id="downloadContainer">
      <h2>Download Your Farm Report</h2>
      <p>Your PDF is ready. Click the button below to download:</p>
      <a href={pdfUrl} download="farm_report.pdf" className="download-btn">
        Download PDF
      </a>
    </div>
  );
}
