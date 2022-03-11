import React, { useState, useEffect } from "react";
import { uniqueId } from "lodash";
import fileSize from "filesize";
import api from "../../services/api";

import { Box } from "@mui/system";
import { Upload } from "./upload";
import { FileList } from "./file-list";
import { Backdrop, CircularProgress } from "@mui/material";

export const ImageUploader = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = () => {
      api
        .get("/posts")
        .then((response) => {
          setUploadedFiles(
            response.data.map((file) => ({
              file: null,
              id: file.id,
              name: file.name,
              readableSize: fileSize(file.size),
              preview: null,
              progress: 0,
              uploaded: true,
              error: false,
              url: file.url,
            }))
          );
        })
        .catch(console.log)
        .finally(() => setLoading(false));
    };
    fetchPosts();
  }, []);

  const updatedFile = (id, data) => {
    setUploadedFiles((uploadedFiles) =>
      uploadedFiles.map((uploadedFile) =>
        uploadedFile.id === id ? { ...uploadedFile, ...data } : uploadedFile
      )
    );
  };

  const processUpload = (uploadedFile) => {
    const data = new FormData();
    data.append("file", uploadedFile.file, uploadedFile.name);

    api
      .post("/posts", data, {
        onUploadProgress: (e) => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));
          updatedFile(uploadedFile.id, {
            progress,
          });
        },
      })
      .then((response) => {
        const file = response.data;
        updatedFile(uploadedFile.id, {
          id: file._id,
          url: file.url,
          key: file.key,
          uploaded: true,
        });
      })
      .catch((_e) => {
        updatedFile(uploadedFile.id, {
          error: true,
        });
      });
  };

  const handleUpload = (files) => {
    const uploadFiles = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: fileSize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    setUploadedFiles((previousUploadedFiles) =>
      previousUploadedFiles.concat(uploadFiles)
    );
    uploadFiles.forEach(processUpload);
  };

  const handleDeleteFile = (file) => {
    const id = file.id;
    api
      .delete(`/posts/${id}?key=${file.key}`)
      .then(() => {
        setUploadedFiles((uploadedFiles) =>
          uploadedFiles.filter((file) => file.id !== id)
        );
      })
      .catch(console.log);
  };

  return (
    <Box>
      <Upload onUpload={handleUpload} />
      {!!uploadedFiles.length && (
        <FileList files={uploadedFiles} onDeleteFile={handleDeleteFile} />
      )}
      <Backdrop open={loading} in={loading}>
        <CircularProgress />
      </Backdrop>
    </Box>
  );
};

export default ImageUploader;
