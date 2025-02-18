import React, { useState } from "react";
import axios from "axios";
import { uploadFiles } from "../api/fileService";

const FileUpload = ({ onUploadSuccess }) => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState("");
    const [cancelTokenSource, setCancelTokenSource] = useState(null);

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const validFiles = selectedFiles.filter((file) => file.type.startsWith("audio/"));

        if (validFiles.length === 0) {
            setError("Please select valid audio files.");
        }
        else {
            setError("");
            setFiles(validFiles);
        }
    };

    const handleUpload = async () => {
        if (files.length === 0) return setError("No file selected!");

        setUploading(true);
        setUploadProgress(0);

        const source = axios.CancelToken.source();
        setCancelTokenSource(source);

        try {
            const data = await uploadFiles(files, (progressEvent) => {
                setUploadProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
            }, source.token);

            setFiles([]);
            onUploadSuccess(data.files);
        }
        catch (err) {
            if (axios.isCancel(err)) {
                setError("Upload cancelled!");
            } else {
                setError("Error uploading file!");
            }
            setUploadProgress(0);
        }
        finally {
            setUploading(false);
            document.getElementById("fileInput").value = "";
        }
    };

    const handleCancelUpload = () => {
        if (cancelTokenSource) {
            cancelTokenSource.cancel("Upload cancelled by user.");
        }
        setUploading(false);
        setUploadProgress(0);
    };

    return (
        <div className="mb-3">
            <input
                type="file"
                id="fileInput"
                multiple
                accept="audio/*"
                className="form-control mb-2 bg-secondary text-white"
                onChange={handleFileChange}
            />

            {uploading && (
                <div className="progress mt-2">
                    <div
                        className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                        role="progressbar"
                        style={{ width: `${uploadProgress}%` }}
                        aria-valuenow={uploadProgress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        {uploadProgress}%
                    </div>
                </div>
            )}

            {error && <div className="alert alert-danger text-center mt-3 mb-2">{error}</div>}

            <button
                className={`btn ${uploading ? "btn-danger" : "btn-primary"} w-100 mt-2`}
                onClick={uploading ? handleCancelUpload : handleUpload}
                disabled={!files.length && !uploading}
            >
                {uploading ? "Cancel Upload" : "Upload Songs"}
            </button>
        </div>
    );
};

export default FileUpload;
