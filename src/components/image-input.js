/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useState } from "react";
import { Card, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";

export default function ImageInput({ onImageSelect }) {
  const [imagePath, setImagePath] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      onImageSelect(acceptedFiles[0]);
      setImagePath(URL.createObjectURL(acceptedFiles[0]));
    },
    [onImageSelect]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    accept: {
      "image/*": [],
    },
  });

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 1,
        width: "100%",
        height: "100%",
        border: "3px dashed rgba(0, 0, 0, 0.12)",
        position: "relative",
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {imagePath ? (
        <img src={imagePath} alt="Image selected" width="100%" height="100%" />
      ) : (
        <Typography variant="h6" sx={{ color: "rgba(0, 0, 0, 0.5)" }}>
          Drag 'n' drop some files here, or click to select files
        </Typography>
      )}
    </Card>
  );
}
