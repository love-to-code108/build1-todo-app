import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import theme from "./Utils/chakraConfig.js";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

import "@fontsource/inter/400.css"; // regular
import "@fontsource/inter/500.css"; // medium
import "@fontsource/inter/700.css"; // bold

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </RecoilRoot>
  </StrictMode>
);
