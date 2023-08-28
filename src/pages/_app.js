import { ChakraProvider } from "@chakra-ui/react";
import "@/styles/globals.css";
import React from "react";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
    
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
