import axiosInstance from "./axiosInstance";

export const fetchFiles = async () => {
    try {
        const { data } = await axiosInstance.get("/api/files");
        return data;
    } catch (error) {
        console.error("Error fetching files:", error);
        return [];
    }
};

export const uploadFiles = async (files, onUploadProgress) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
        const { data } = await axiosInstance.post("/api/files/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress,
        });

        return data;
    } catch (error) {
        console.error("Error uploading files:", error);
        throw error;
    }
};

export const deleteFile = async (id) => {
    try {
        await axiosInstance.delete(`/api/files/${id}`);
    } catch (error) {
        console.error("Error deleting file:", error);
    }
};
