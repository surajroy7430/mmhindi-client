import React, { useState, useEffect } from "react";
import { fetchFiles, deleteFile } from "../api/fileService";
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";

const Home = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    useEffect(() => {
        loadFiles();
    }, []);

    const loadFiles = async () => {
        const files = await fetchFiles();
        setUploadedFiles(files);
    };

    const handleDelete = async (id) => {
        await deleteFile(id);
        loadFiles();
    };

    return (
        <div className="container-fluid bg-dark text-white min-vh-100 py-5">
            <div className="w-100 px-0">
                <h2 className="text-center text-uppercase mb-4">Song Upload System</h2>

                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-8 col-md-10 col-sm-12">
                        <div className="p-4 border rounded bg-gradient">
                            <FileUpload onUploadSuccess={loadFiles} />
                        </div>
                    </div>
                </div>

                <div className="row mt-4 justify-content-center">
                    <div className="col-xl-8 col-lg-10 col-md-12">
                        <FileList files={uploadedFiles} onDelete={handleDelete} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
