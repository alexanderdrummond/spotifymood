import { useEffect, useState } from 'react';
import { Box, Text, useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const lines = [
  'For millennia, music has impacted human life',
  'It has changed the way we think, act and feel',
  'Explore how music can transform and adapt to your mood',
];

export default function IntroText({ onComplete }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [allLinesShown, setAllLinesShown] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    let timer;
    if (currentLine < lines.length) {
      timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setCurrentLine((prevLine) => prevLine + 1);
          setFadeOut(true);
        }, 1500); 
      }, 3000);
    } else {
      setAllLinesShown(true);
      timer = setTimeout(() => {
        onOpen();
        setTimeout(() => {
          onClose();
          onComplete();
        }, 1500);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [currentLine]);

  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
      bg="#000000"
      opacity={isOpen || allLinesShown ? 0 : 1}
      transition={`opacity ${allLinesShown ? 3 : 1}s ease-in-out`}
    >
      <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
        <MotionBox
          key={currentLine} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="white"
            textAlign="center"
          >
            {lines[currentLine]}
          </Text>
        </MotionBox>
      </Box>
    </Box>
  );
}
