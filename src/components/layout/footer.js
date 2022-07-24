import { Container, Typography } from "@mui/material";
import { Copyright } from "./copyright";

export default function Footer() {
  return (
    <Container sx={{ bgcolor: "background.paper", p: 3 }} component="footer">
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        Made with ❤️by Developer!
      </Typography>
      <Copyright />
    </Container>
  );
}
