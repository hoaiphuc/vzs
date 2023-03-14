import { Content } from "./Content.js"
import { Box } from "./Box.js";

export const Layout = ({ children }) => (
  <Box
    css={{
      maxW: "100%",
      boxShadow: "2px 2px 25px -7px #4c4c4c",
    }}
  >
 {children}
    <Content />
  </Box>
);
