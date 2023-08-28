import React, { useState } from 'react';
import { VStack, Text, Grid, Button, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGuitar, faMicrophone, faPiano, faDrum, faHeadphones, faRecordVinyl, faMusic, faVolumeUp, faCompactDisc } from '@fortawesome/free-solid-svg-icons';

const MotionVStack = motion(VStack);
const MotionBox = motion(Grid);

const genreIcons = {
  Rock: faGuitar,
  Jazz: faMicrophone,
  Classical: faPiano,
  Electronic: faHeadphones,
  HipHop: faRecordVinyl,
  Pop: faMusic,
  Reggae: faVolumeUp,
  Metal: faCompactDisc,
  Blues: faDrum,
};

const GenreSelection = ({ genres, onGenreSelect, handleContinueToGenre }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleGenreClick = (genre) => {
    let newSelectedGenres = [...selectedGenres];
    if (newSelectedGenres.includes(genre)) {
      newSelectedGenres = newSelectedGenres.filter(g => g !== genre);
    } else if (newSelectedGenres.length < 2) {
      newSelectedGenres.push(genre);
    }
    setSelectedGenres(newSelectedGenres);
    onGenreSelect(newSelectedGenres);
  };

  return (
    <MotionVStack spacing={4} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }}>
      <Text fontSize="2xl" fontWeight="bold" color="white">2 genres you're into?</Text>
      <MotionBox templateColumns="repeat(3, 1fr)" gap={4} w="100%">
        {genres.map((genre) => (
          <MotionBox key={genre} borderRadius="md" p={4} position="relative" bg="rgba(255, 255, 255, 0.1)" backdropFilter="blur(15px)" border={selectedGenres.includes(genre) ? '2px solid limegreen' : 'none'} onClick={() => handleGenreClick(genre)}>
            <VStack>
              <FontAwesomeIcon icon={genreIcons[genre]} size="2x" color="white" />
              <Text color="white">{genre}</Text>
            </VStack>
          </MotionBox>
        ))}
      </MotionBox>
      <Button bg="green.400" isDisabled={selectedGenres.length !== 2} onClick={handleContinueToGenre}>Continue</Button>
    </MotionVStack>
  );
};

export default GenreSelection;
