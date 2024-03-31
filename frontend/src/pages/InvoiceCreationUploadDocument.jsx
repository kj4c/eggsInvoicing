import { useRef, useState } from "react";
// import axios from "axios";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import "../stylesheets/InvoiceCreationUploadDocument.css";

const InvoiceCreationUploadDocument = () => {
  const inputRef = useRef();

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("select");

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const clearFileInput = () => {
    inputRef.current.value = "";
    setSelectedFile(null);
    setUploadProgress(0);
    setUploadStatus("select");
  };

  const handleFileUpload = async () => {
    if (uploadStatus === "done") {
      clearFileInput();
      return;
    }

    try {
      setUploadStatus("uploading");

      const formData = new FormData();
      formData.append("file", selectedFile);

      // const response = await axios.post(
      //   "http://localhost:8000/api/upload",
      //   formData,
      //   {
      //     onUploadProgress: (progressEvent) => {
      //       const percentCompleted = Math.round(
      //         (progressEvent.loaded * 100) / progressEvent.total
      //       );
      //       setUploadProgress(percentCompleted);
      //     },
      //   }
      // );

      setUploadStatus("done");
    } catch (error) {
      setUploadStatus("select");
    }
  };

  return (
    <div className="ICUD-container">
      <div>
        <input
          ref={inputRef}
          style={{ display: "none" }}
          type="file"
          onChange={handleFileInput}
        />

        {!selectedFile && (
          <button className="upload" onClick={onChooseFile}>
            <span style={{ lineHeight: 1 }}>
              <MdOutlineFileUpload className="uploadIcon" />
            </span>
            Upload File
          </button>
        )}

        {selectedFile && (
          <>
            <button className="upload" onClick={onChooseFile}>
              <span style={{ lineHeight: 1 }}>
                <MdOutlineFileUpload className="uploadIcon" />
              </span>
              Upload File
            </button>

            <div className="file-container">
              <span className="file-icon">
                <FaRegFileAlt />
              </span>

              <div className="file-desc">
                <div style={{ flex: 1 }}>
                  <h1>{selectedFile.name}</h1>
                  <div className="progress-container">
                    <div
                      className="progress-bar"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>

                {uploadStatus === "select" ? (
                  <button onClick={clearFileInput}>
                    <span className="close-icon">
                      <IoIosClose />
                    </span>
                  </button>
                ) : (
                  <div className="progress-circle">
                    {uploadStatus === "uploading" ? (
                      `${uploadProgress}%`
                    ) : uploadStatus === "done" ? (
                      <span>
                        <FaCheck />
                      </span>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
            <button className="upload-btn" onClick={handleFileUpload}>
              {uploadStatus === "select" || uploadStatus === "uploading"
                ? "Upload"
                : "Done"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default InvoiceCreationUploadDocument;
