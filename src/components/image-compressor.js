/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Box, Button, Card, Grid, Snackbar } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useS3Upload } from "next-s3-upload";
import { useSnackbar } from "notistack";

import ImageInput from "./image-input";
import imageCompression from "browser-image-compression";

export default function ImageCompressor() {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [resultImageURL, setResultImageURL] = useState(null);
  const [compressing, setCompressing] = useState(false);

  const { uploadToS3 } = useS3Upload();
  const { enqueueSnackbar } = useSnackbar();

  const handleImageSelect = (file) => {
    setOriginalImage(file);
    setCompressedImage(null);
    setResultImageURL(null);
  };

  const handleCompress = async () => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };

    if (options.maxSizeMB >= originalImage.size / 1024) {
      alert("Image is too small, can't be Compressed!");
    }

    try {
      setCompressing(true);
      const output = await imageCompression(originalImage, options);
      const { url: originalImageUrl } = await uploadToS3(originalImage);
      enqueueSnackbar("Original image uploaded!", { variant: "success" });

      setCompressedImage(output);
      setResultImageURL(URL.createObjectURL(output));
      const { url: compressedImageUrl } = await uploadToS3(output);
      enqueueSnackbar("Compressed image uploaded!", { variant: "success" });

      const payload = {
        file_name: originalImage.name,
        original_url: originalImageUrl,
        compressed_url: compressedImageUrl,
        original_size: originalImage.size,
        compressed_size: output.size,
        type: originalImage.type,
      };
      await fetch("/api/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      enqueueSnackbar("Image data saved!", { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Image upload failed!", { variant: "error" });
    } finally {
      setCompressing(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item md={5} xs={12}>
          <ImageInput onImageSelect={handleImageSelect} />
        </Grid>
        <Grid
          item
          md={2}
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card
            variant="outlined"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
              p: 2,
            }}
          >
            <LoadingButton
              variant="outlined"
              fullWidth
              loading={compressing}
              disabled={!originalImage}
              onClick={handleCompress}
            >
              Compress
            </LoadingButton>

            <Button
              variant="outlined"
              fullWidth
              disabled={!compressedImage}
              href={resultImageURL}
              download={compressedImage?.name}
            >
              Download
            </Button>
          </Card>
        </Grid>
        <Grid
          item
          md={5}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            variant="outlined"
            sx={{
              display: "flex",
              flexGrow: 1,
              p: 1,
              borderRadius: 1,
              border: "3px dashed rgba(0, 0, 0, 0.12)",
            }}
          >
            <img
              src={resultImageURL ? resultImageURL : "/imgs/placeholder.png"}
              alt="Picture of the author"
              width="100%"
              layout="responsive"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
