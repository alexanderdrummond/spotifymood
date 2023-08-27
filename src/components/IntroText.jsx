import { useEffect, useState } from 'react';
import { Box, Text, useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const lines = [
  'Music has always had an impact on human lives',
  'It can change the way we think, act and feel',
  'This app is your companion for a better day.',
];

export default function IntroText({ onComplete }) {
    const [currentLine, setCurrentLine] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const longestLine = lines.reduce((a, b) => (a.length > b.length ? a : b));
    
    useEffect(() => {
      if (currentLine < lines.length) {
        const timer = setTimeout(() => {
          setCurrentLine((prevLine) => prevLine + 1);
        }, 2000);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          onOpen();
          setTimeout(() => {
            onClose();
            onComplete();
          }, 3000);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [currentLine]);
    
    return (
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="#000000"
        opacity={isOpen ? 0 : 1}
        transition="opacity 1s ease-in-out"
      >
        <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
          {lines.slice(0, currentLine).map((line, index) => (
            <MotionBox
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Text
                fontSize="2xl"
                fontWeight="bold"
                color="white"
                minW={[`${longestLine.length}ch`]}
                textAlign="center"
              >
                {line}
              </Text>
            </MotionBox>
          ))}
        </Box>
      </Box>
    );
  }