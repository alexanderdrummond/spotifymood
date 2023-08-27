import { VStack, Text, Center, Grid, Box, Button } from '@chakra-ui/react';
import TimeOfDayCard from '../components/TimeOfDayCard';
import MoodSelection from '../components/MoodSelection';
import IntroText from '../components/IntroText';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);


const timeOfDayOptions = [
  { time: 'Morning', imageSrc: 'twilight-beach.jpg' },
  { time: 'Afternoon', imageSrc: 'twilight-beach.jpg' },
  { time: 'Evening', imageSrc: 'twilight-beach.jpg' },
  { time: 'Night', imageSrc: 'twilight-beach.jpg' },
];
const moodOptions = ['Happy', 'Relaxed', 'Energetic', 'Calm', 'Excited', 'Sad', 'Angry', 'Stressed', 'Anxious'];

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState(null);
  const [showMoodSelection, setShowMoodSelection] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showTimeOfDay, setShowTimeOfDay] = useState(false);

  const handleTimeOfDaySelect = (timeOfDay) => {
    setSelectedTimeOfDay(timeOfDay);
    setShowMoodSelection(true);
  };

  const handleMoodSelect = (mood) => {
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
    setShowTimeOfDay(true); 
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const audioElement = document.getElementById('ambient-audio');
      audioElement.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.log('Audio play failed: ', error);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const toggleAudio = () => {
    const audioElement = document.getElementById('ambient-audio');
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying);
  };


  return (
    <Box style={{
      background: "linear-gradient(45deg, #8baaaa, #ae8b9c)",
      backgroundSize: "100% 100%",
      animation: "AnimationName 22s ease"
    }}>
    <audio id="ambient-audio" loop>
      <source src="/ambient.wav" type="audio/wav" />
    </audio>
    <Button onClick={toggleAudio} style={{ position: 'absolute', top: '10px', right: '10px' }}>
      {isPlaying ? 'Mute' : 'Unmute'}
    </Button>
    <Center height="100vh" position="relative">
      {showIntro && <IntroText onComplete={handleIntroComplete} />}
      <VStack spacing={4}>
        {showMoodSelection ? (
          <MoodSelection moods={moodOptions} onMoodSelect={handleMoodSelect} />
        ) : showTimeOfDay ? (
          <>
          <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}>
    <Text fontSize="2xl" fontWeight="bold" color="white">
        What time of day is it?
        </Text>
        </MotionBox>
            <Grid templateColumns="repeat(2, 1fr)" gap={25}>
              
              {timeOfDayOptions.map((option, index) => (
                <TimeOfDayCard
                  key={index}
                  time={option.time}
                  imageSrc={option.imageSrc}
                  onSelect={handleTimeOfDaySelect}
                />
              ))}
            </Grid>
          </>
        ) : null}
      </VStack>
    </Center>
    </Box>
  );
}