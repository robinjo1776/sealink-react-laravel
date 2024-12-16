import { useState } from "react";

function EditCargoInsurance({ formCarrier, setformCarrier }) {
  // State to store uploading status
  const [uploading, setUploading] = useState(false);

  // Handle file change for uploads
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    setUploading(true);
  
    const formData = new FormData();
    formData.append("file", file);  // Match the key here to 'file'
  
    const token = localStorage.getItem("token");  // Assuming you are sending a token for authorization
    try {
      const response = await fetch("http://127.0.0.1:8000/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Upload failed:", errorText);
        alert("File upload failed. Please try again.");
        return;
      }
  
      const data = await response.json();
      if (data.fileUrl) {
        setformCarrier({
          ...formCarrier,
          coi_cert: data.fileUrl, // Update the correct field in state
        });
      } else {
        console.error("File URL not returned in the response");
        alert("File upload failed: No file URL returned.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  
  

  // Render download link if file URL exists
  const renderDownloadLink = (fileUrl, fileLabel) => {
    if (fileUrl) {
      return (
        <div>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            Download {fileLabel}
          </a>
        </div>
      );
    }
    return null;
  };

  return (
    <fieldset className="form-section">
      <legend>Cargo Insurance Details</legend>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="ciProvider">Cargo Insurance Provider</label>
          <input
            type="text"
            value={formCarrier.ci_provider}
            onChange={(e) =>
              setformCarrier({ ...formCarrier, ci_provider: e.target.value })
            }
            id="ciProvider"
          />
        </div>
        <div className="form-group">
          <label htmlFor="ciPolicyNo">Policy Number</label>
          <input
            type="text"
            value={formCarrier.ci_policy_no}
            onChange={(e) =>
              setformCarrier({ ...formCarrier, ci_policy_no: e.target.value })
            }
            id="ciPolicyNo"
          />
        </div>
        <div className="form-group">
          <label htmlFor="ciCoverage">Coverage Amount</label>
          <input
            type="number"
            value={formCarrier.ci_coverage}
            onChange={(e) =>
              setformCarrier({ ...formCarrier, ci_coverage: e.target.value })
            }
            id="ciCoverage"
          />
        </div>
        <div className="form-group">
          <label htmlFor="ciStartDate">Start Date</label>
          <input
            type="date"
            value={formCarrier.ci_start_date}
            onChange={(e) =>
              setformCarrier({ ...formCarrier, ci_start_date: e.target.value })
            }
            id="ciStartDate"
          />
        </div>
        <div className="form-group">
          <label htmlFor="ciEndDate">End Date</label>
          <input
            type="date"
            value={formCarrier.ci_end_date}
            onChange={(e) =>
              setformCarrier({ ...formCarrier, ci_end_date: e.target.value })
            }
            id="ciEndDate"
          />
        </div>

        <div className="form-group">
          <label htmlFor="coiCert">Certificate of Insurance</label>
          <input
            type="file"
            name="coiCert"
            onChange={(e) => handleFileChange(e, "coi_cert")}
            accept="application/pdf"
          />
          {/* Show existing file download link if a file exists */}
          {renderDownloadLink(formCarrier.coi_cert, "Certificate of Insurance")}
          {uploading && <p>Uploading...</p>}
        </div>
      </div>
    </fieldset>
  );
}

export default EditCargoInsurance;
