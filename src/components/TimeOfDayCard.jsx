import React from 'react';
import { Box, Text, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const TimeOfDayCard = ({ time, imageSrc, onSelect }) => {
  return (<Box>
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      w="400px"
      h="200px"
      mx="auto"
      bg="rgba(255, 255, 255, 0.1)" 
      backdropFilter="blur(15px)" 
      boxShadow="0px 8px 20px rgba(0, 0, 0, 0.15)"
      borderRadius="20px"
      overflow="hidden"
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      onClick={() => onSelect(time)}
    >
      <Box position="relative" h="100%">
        <Image src={imageSrc} alt={`${time} image`} objectFit="cover" w="100%" h="70%" borderTopLeftRadius="20px" borderTopRightRadius="20px" />
        <Text fontSize="xl" fontWeight="bold" color="white" p={2} textAlign="center">
          {time}
        </Text>
      </Box>
    </MotionBox>
    </Box>
  );
};

export default TimeOfDayCard;
