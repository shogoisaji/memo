import { Box } from "@mui/material";

function ResponsiveImage({ src, alt }) {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        width: {
          xs: "0", // 非表示
          sm: "200px",
          md: "300px",
          lg: "400px",
        },
        height: "auto",
        display: {
          xs: "none",
          sm: "block",
        },
      }}
    />
  );
}
