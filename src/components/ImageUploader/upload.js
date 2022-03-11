import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import { DropContainer, UploadMessage } from "./styles";
import { FormHelperText } from "@mui/material";

export const Upload = (props) => {
  const renderDragMessage = (isDragActive, isDragReject) => {
    if (!isDragActive)
      return (
        <UploadMessage>
          Arraste ou clique para carregar seus arquivos
        </UploadMessage>
      );
    if (isDragReject)
      return (
        <UploadMessage type="error">Arquivo/s não suportado!</UploadMessage>
      );
    if (isDragActive)
      return (
        <UploadMessage type="success">Solte o/s arquivos aqui.</UploadMessage>
      );
  };

  return (
    <Dropzone accept="image/*" onDropAccepted={props.onUpload}>
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <DropContainer
          isDragActive={String(isDragActive)}
          isDragReject={String(isDragReject)}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {renderDragMessage(isDragActive, isDragReject)}
          <FormHelperText sx={{ textAlign: "center", paddingBottom: "5px" }}>
            (Tamanho máximo: 2,097k)
          </FormHelperText>
        </DropContainer>
      )}
    </Dropzone>
  );
};

Upload.propTypes = {
  onUpload: PropTypes.func,
};

export default Upload;
