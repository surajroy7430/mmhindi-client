import React from "react";

const FileItem = ({ file, index, onDelete }) => {
    return (
        <tr>
            <td className="text-center">
                {index + 1}
            </td>
            <td>
                {file.filename.replace(/_/g, " ").replace(/\.[^/.]+$/, "")}
            </td>
            <td className="text-center">
                {file.coverImageUrl ? (
                    <a
                        href={file.coverImageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-info btn-sm"
                    >
                        Cover Image
                    </a>
                ) : (
                    <span>No Cover Image</span>
                )}
            </td>
            <td className="text-center">
                <a
                    href={file.viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-info"
                >
                    View
                </a>
            </td>
            <td className="text-center">
                <a
                    href={file.downloadUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-success"
                >
                    Download
                </a>
            </td>
            <td className="text-center">
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(file._id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default FileItem;
