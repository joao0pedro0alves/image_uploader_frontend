import React from "react";
import { Container, Paper, styled } from "@mui/material";
import ImageUploader from "../components/ImageUploader";

const StyledMain = styled("main")(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.primary.main,
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  ".MuiPaper-root": {
    padding: 15,
    marginTop: 15,
    marginBottom: 15,
    maxHeight: "75vh",
    overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      maxHeight: "none",
    },
  },
}));

export default function Main() {
  return (
    <StyledMain>
      <StyledContainer maxWidth="md">
        <Paper>
          <ImageUploader />
        </Paper>
      </StyledContainer>
    </StyledMain>
  );
}
