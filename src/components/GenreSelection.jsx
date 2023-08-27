import { Box, IconButton } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRock, faPop, faJazz, faClassical, faRap, faCountry, faReggae, faBlues, faElectronic } from '@fortawesome/free-brands-svg-icons';

const genreOptions = [
  { genre: 'Rock', icon: faRock },
  { genre: 'Pop', icon: faPop },
  { genre: 'Jazz', icon: faJazz },
  { genre: 'Classical', icon: faClassical },
  { genre: 'Rap', icon: faRap },
  { genre: 'Country', icon: faCountry },
  { genre: 'Reggae', icon: faReggae },
  { genre: 'Blues', icon: faBlues },
  { genre: 'Electronic', icon: faElectronic },
];

export default function GenreSelection({ onGenreSelect }) {
  const handleGenreSelect = (genre) => {
    onGenreSelect(genre);
  };

  return (
    <Box>
      {genreOptions.map((option, index) => (
        <IconButton
          key={index}
          aria-label={option.genre}
          icon={<FontAwesomeIcon icon={option.icon} />}
          onClick={() => handleGenreSelect(option.genre)}
        />
      ))}
    </Box>
  );
}
