import React from "react";
import FileItem from "./FileItem";

const FileList = ({ files, onDelete }) => {
    return (
        <div>
            {files.length === 0 ? (
                <>
                    <h4 className="mt-5 text-center mb-3 text-uppercase">
                        Uploaded Songs
                    </h4>
                    <p className="text-center">No songs uploaded yet.</p>
                </>
            ) : (
                <>
                    <h4 className="mt-5 text-center mb-3 text-uppercase">
                        Uploaded Songs ({files.length})
                    </h4>

                    <div className="table-responsive">
                        <table className="table table-dark table-bordered table-hover text-white">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col" className="text-center">
                                        #
                                    </th>
                                    <th scope="col">File Name</th>
                                    <th scope="col" className="text-center">
                                        Cover Image
                                    </th>
                                    <th scope="col" className="text-center">
                                        View
                                    </th>
                                    <th scope="col" className="text-center">
                                        Download
                                    </th>
                                    <th scope="col" className="text-center">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {files
                                    .slice()
                                    .sort((a, b) =>
                                        a.filename
                                            .replace(/_/g, " ")
                                            .localeCompare(b.filename.replace(/_/g, " "))
                                    )
                                    .map((file, index) => (
                                        <FileItem key={index + 1} file={file} index={index} onDelete={onDelete} />
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default FileList;
