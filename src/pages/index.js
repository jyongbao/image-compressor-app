import * as React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

import Header from "../components/layout/header";
import Footer from "../components/layout/footer";

import ImageCompressor from "../components/image-compressor";
const Home = () => {
  return (
    <>
      <Header />
      <Box component="main">
        {/* Hero unit */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "100%",
            bgColor: "background.paper",
            pt: 4,
            mx: 4,
          }}
        >
          <Box>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Image Compressor
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Compress images with nearly no visual difference!
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, py: 8 }}>
            <ImageCompressor />
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Home;
