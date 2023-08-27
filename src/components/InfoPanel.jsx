import React from 'react';
import {
  Box,
  Button,
  HStack,
  VStack,
  Text,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Link,
  isCentered
} from '@chakra-ui/react';
import { FaGithub, FaInfoCircle, FaPlay, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const InfoPanel = ({ onStartExperience }) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <MotionBox initial="hidden" animate="visible" exit="hidden" variants={variants}>
      <Box
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(10px)"
        p="24px"
        borderRadius="12px"
      >
        <VStack spacing={4} maxW="600px">
          <Text fontSize="xl" fontWeight="bold" color="white" isCentered>
            Welcome to Vibe Delta
          </Text>
          <Text fontSize="md" color="white" mb="2em" isCentered>
            There's a common belief that music can not only change moods, but also change lives. Embracing that conception, this app's goal is to help you retain a positive mood or change a negative mood, assisted by music. This is done through the selection process you'll meet once you press start.
          </Text>
          <HStack spacing={3}>
            
            <Button
              backgroundColor="blackAlpha.900"
              leftIcon={<Icon as={FaGithub} />}
              onClick={() => window.open('https://github.com/')}
            >
              View on Github
            </Button>
            <Popover>
              <PopoverTrigger>
                <Button
                  backgroundColor="blackAlpha.900"
                  leftIcon={<Icon as={FaInfoCircle} />}
                >
                  Creator Details
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader bg="blackAlpha.800">Creator Details</PopoverHeader>
                <PopoverBody bg="blackAlpha.800">
                  <Text>By Alexander Drummond</Text>
                  <VStack>
                  <Link href="https://github.com/alexanderdrummond" isExternal>
                    <Icon as={FaGithub} /> GitHub
                  </Link>
                  <Link href="mailto:alex@alexdrum.com">
                    <Icon as={FaEnvelope} /> Send Email
                  </Link>
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Button
              backgroundColor="green.400"
              leftIcon={<Icon as={FaPlay} />}
              onClick={onStartExperience}
            >
              Start Experience
            </Button>
          </HStack>
        </VStack>
      </Box>
    </MotionBox>
  );
};

export default InfoPanel;
