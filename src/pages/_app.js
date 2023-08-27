import { ChakraProvider } from "@chakra-ui/react";
import "@/styles/globals.css";
import React from "react";


const ImagePreloader = ({ imageUrls }) => {
  React.useEffect(() => {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, [imageUrls]);

  return null;
};

const imageUrls = [
  'twilight-beach.jpg',
];

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ImagePreloader imageUrls={imageUrls} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
