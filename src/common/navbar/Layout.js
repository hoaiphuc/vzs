import { Content } from "./Content.js"
import { Box } from "./Box.js";

export const Layout = ({ children }) => (
  <Box
    css={{
      maxW: "100%",
      boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.2)",
    }}
  >
 {children}
    <Content />
  </Box>
);
