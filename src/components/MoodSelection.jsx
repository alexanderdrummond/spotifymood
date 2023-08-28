import React, { useState } from 'react';
import { VStack, Text, Grid, Button, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faMeh, faAngry, faGrinStars, faTired, faFrown, faGrimace, faDizzy, faFlushed, faCheck } from '@fortawesome/free-solid-svg-icons';

const MotionVStack = motion(VStack);
const MotionBox = motion(Grid);

const moodIcons = {
  Happy: faSmile,
  Relaxed: faMeh,
  Energetic: faGrinStars,
  Calm: faTired,
  Excited: faAngry,
  Sad: faFrown,
  Angry: faGrimace,
  Stressed: faDizzy,
  Anxious: faFlushed,
};

const MoodSelection = ({ moods, onMoodSelect, onContinue }) => {
  const [selectedMoods, setSelectedMoods] = useState([]);

  const handleMoodClick = (mood) => {
    let newSelectedMoods = [...selectedMoods];
    
    if (newSelectedMoods.includes(mood)) {
      newSelectedMoods = newSelectedMoods.filter(m => m !== mood);
    } else if (newSelectedMoods.length < 2) {
      newSelectedMoods.push(mood);
    }

    setSelectedMoods(newSelectedMoods);
    onMoodSelect(newSelectedMoods);
  };

  return (
    <MotionVStack
      spacing={4}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <Text fontSize="2xl" fontWeight="bold" color="white">2 moods that you're in?</Text>
      <MotionBox
        templateColumns="repeat(3, 1fr)"
        gap={4}
        w="100%"
      >
        {moods.map((mood) => (
          <MotionBox
            whileHover={{ scale: 1.05 }}
            key={mood}
            borderRadius="md"
            p={4}
            position="relative"
            bg="rgba(255, 255, 255, 0.1)"
            backdropFilter="blur(15px)"
            border={selectedMoods.includes(mood) ? '2px solid limegreen' : 'none'}
            onClick={() => handleMoodClick(mood)}
          >
            <VStack>
              <FontAwesomeIcon icon={moodIcons[mood]} size="2x" color="white" />
              <Text color="white">{mood}</Text>
            </VStack>
            {selectedMoods.includes(mood) && (
              <Box position="absolute" top="2" right="2">
                <FontAwesomeIcon icon={faCheck} color="limegreen" />
              </Box>
            )}
          </MotionBox>
        ))}
      </MotionBox>
      <Button bg="green.400" isDisabled={selectedMoods.length !== 2} onClick={onContinue}>Continue</Button>
    </MotionVStack>
  );
};

export default MoodSelection;