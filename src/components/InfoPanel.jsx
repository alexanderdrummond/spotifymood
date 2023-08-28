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
  Link
} from '@chakra-ui/react';
import { FaGithub, FaInfoCircle, FaPlay, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const InfoPanel = ({ onStartExperience }) => {
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Box
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(10px)"
        p="24px"
        borderRadius="12px"
      >
        <VStack spacing={4} maxW="600px">
          <Text fontSize="xl" fontWeight="bold" color="white" textAlign="center">
            Welcome to Vibe Delta
          </Text>
          <Text fontSize="md" color="white" textAlign="center">
            There's a common belief that music can not only change moods, but also change lives. Embracing that conception, this app's goal is to help you retain a positive mood or change a negative mood, assisted by music.
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
                <PopoverHeader>Creator Details</PopoverHeader>
                <PopoverBody>
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
