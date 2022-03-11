import React from "react";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { CheckCircle, Error } from "@mui/icons-material";

export const FileList = ({ files, onDeleteFile }) => {
  console.log(files);
  return (
    <Box sx={styles.container}>
      {files.map((file) => (
        <li key={file.id}>
          <Box sx={styles.fileInfo}>
            <Box
              target="_blank"
              href={file.url}
              component="a"
              sx={{
                ...styles.preview,
                backgroundImage: `url(${file.preview})`,
              }}
            />
            <div className="file-data">
              <strong>{file.name}</strong>
              <span>
                {file.readableSize}
                <button onClick={() => onDeleteFile(file)}>Excluir</button>
              </span>
            </div>
          </Box>
          <div>
            {!file.uploaded && !file.error && (
              <CircularProgress
                size={24}
                color="primary"
                value={file.progress}
                variant="determinate"
              />
            )}
            {file.uploaded && <CheckCircle fontSize="medium" color="success" />}
            {file.error && <Error fontSize="medium" color="error" />}
          </div>
        </li>
      ))}
    </Box>
  );
};

const styles = {
  container: {
    padding: "12px",
    marginTop: "8px",
    li: {
      padding: "4.5px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      color: "common.black",
      "& + li": {
        marginTop: "15px",
      },
    },
  },
  fileInfo: {
    display: "flex",
    alignItems: "center",
    "div.file-data": {
      display: "flex",
      flexDirection: "column",
      span: {
        fontSize: "12px",
        color: "#999",
        marginTop: "5px",
        button: {
          border: 0,
          background: "transparent",
          color: "error.main",
          marginLeft: "5px",
          cursor: "pointer",
        },
      },
    },
  },
  preview: {
    width: "36px",
    height: "36px",
    borderRadius: "5px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "50% 50%",
    marginRight: "10px",
    border: "1px solid #ccc",
  },
};
