import { styled } from "@mui/material/styles";

export const DropContainer = styled("div")(
  ({ isDragActive, isDragReject, theme }) => {
    const getBorderColor = (isDragActive, isDragReject, theme) => {
      if (isDragActive === "true") return theme.palette.success.main;
      else if (isDragReject === "true") return theme.palette.error.main;
    };

    return {
      border: "1px dashed #ddd",
      borderRadius: 10,
      cursor: "pointer",
      borderColor: getBorderColor(isDragActive, isDragReject, theme),
    };
  }
);

export const UploadMessage = styled("p")(({ theme, type }) => {
  const messageColors = {
    default: theme.palette.primary.main,
    error: theme.palette.error.main,
    success: theme.palette.success.main,
  };
  return {
    display: "flex",
    color: messageColors[type || "default"],
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "15px 0 0",
    fontSize: "max(11px, 2vmin)",
  };
});
