import { VStack, Text, Center, Grid, Box, Button } from '@chakra-ui/react';
import TimeOfDayCard from '../components/TimeOfDayCard';
import MoodSelection from '../components/MoodSelection';
import GenreSelection from '../components/GenreSelection';
import IntroText from '../components/IntroText';
import PlaylistsDisplay from '@/components/PlaylistsDisplay';
import InfoPanel from '../components/InfoPanel';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import axios from 'axios';
import { exchangeAuthorizationCodeForToken } from '../utils/spotifyAuth';

const MotionBox = motion(Box);

const timeOfDayOptions = [
  { time: 'Morning', imageSrc: 'morning.svg' },
  { time: 'Afternoon', imageSrc: 'afternoon.svg' },
  { time: 'Evening', imageSrc: 'evening.svg' },
  { time: 'Night', imageSrc: 'night.svg' },
];
const moodOptions = ['Happy', 'Relaxed', 'Energetic', 'Calm', 'Excited', 'Sad', 'Angry', 'Stressed', 'Anxious'];
const genreOptions = ['Rock', 'Jazz', 'Classical', 'Electronic', 'HipHop', 'Pop', 'Reggae', 'Metal', 'Blues'];

export default function Home() {
  const [appStarted, setAppStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState(null);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [fetchedPlaylists, setFetchedPlaylists] = useState(null);
  const [showMoodSelection, setShowMoodSelection] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showTimeOfDay, setShowTimeOfDay] = useState(false);
  const [showGenreSelection, setShowGenreSelection] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [spotifyAccessToken, setSpotifyAccessToken] = useState(null);
  const requestBody = encodeURIComponent('grant_type=client_credentials');
  const [showPlaylistsDisplay, setShowPlaylistsDisplay] = useState(false);

  useEffect(() => {
    if (selectedTimeOfDay && selectedMoods.length > 0 && selectedGenres.length > 0) {
      fetchFromSpotifyAPI();
    }
  }, [selectedTimeOfDay, selectedMoods, selectedGenres]);


  const router = useRouter();
  const authorizationCode = router.query.code || null;

  const handleTimeOfDaySelect = (timeOfDay) => {
    setSelectedTimeOfDay(timeOfDay);
    setShowTimeOfDay(false);
    setShowMoodSelection(true);
  };

  const handleMoodSelect = (mood) => {
    setSelectedMoods(mood);
  };

  const handleContinueToGenre = () => {
    setShowMoodSelection(false);
    setShowGenreSelection(true);
  };

  const handleGenreSelectAndFetchPlaylists = (genres) => {
    setSelectedGenres(genres);
    setShowGenreSelection(false);
    setShowPlaylistsDisplay(true);
  };
  

  const fetchPlaylists = () => {
    if (selectedTimeOfDay && selectedMoods.length > 0 && selectedGenres.length > 0) {
      fetchFromSpotifyAPI();
    }
  };

  const handleGenreSelect = (genres) => {
    setSelectedGenres(genres);
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
    requestAnimationFrame(() => {
      setShowInfoPanel(true);
    });
  };

  const startApp = () => {
    setAppStarted(true);
    const audioElement = document.getElementById('ambient-audio');
    audioElement.play().then(() => {
      setIsPlaying(true);
    }).catch(error => {
      console.log('Audio play failed: ', error);
    });
  };

  const toggleAudio = () => {
    const audioElement = document.getElementById('ambient-audio');
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    getSpotifyAccessToken();
  }, []);

  useEffect(() => {
    if (authorizationCode) {
      exchangeAuthorizationCodeForToken(authorizationCode).then(token => {
        if (token) {
          setSpotifyAccessToken(token);
        }
      });
    }
  }, [authorizationCode]);

  const getSpotifyAccessToken = async () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET

  
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
  
    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        data.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${auth}`
          }
        }
      );
  
      setSpotifyAccessToken(response.data.access_token);
    } catch (err) {
    }
  };
  
  

  const fetchFromSpotifyAPI = () => {
    const query = `${selectedTimeOfDay} ${selectedMoods.join(' ')} ${selectedGenres.join(' ')}`;
    axios.get(`https://api.spotify.com/v1/search?q=${query}&type=playlist`, {
      headers: {
        'Authorization': `Bearer ${spotifyAccessToken}`
      }
    })
    .then(res => {
      setFetchedPlaylists(res.data.playlists.items);
    })
    .catch(err => console.log(err));
  };

  return (
    <Box
      style={{
        background: appStarted
          ? "linear-gradient(45deg, #8baaaa, #ae8b9c)"
          : "black",
        backgroundSize: "100% 100%",
        animation: "AnimationName 22s ease",
      }}
    >
      <audio id="ambient-audio" loop>
        <source src="/ambient.wav" type="audio/wav" />
      </audio>
      {appStarted && (
        <Button
          onClick={toggleAudio}
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          {isPlaying ? "Mute" : "Unmute"}
        </Button>
      )}
      <Center height="100vh" position="relative">
        {!appStarted && (
          <VStack>
            <Text fontSize="xl" fontWeight="bold" color="white">
              "Where words fail, music speaks."
            </Text>
            <Text fontSize="xl" fontWeight="bold" color="white" mb="40px">
              - Hans Christian Andersen
            </Text>
            <Button backgroundColor="white" color="black" onClick={startApp}>
              Start
            </Button>
          </VStack>
        )}
        {appStarted && (
          <>
            {showIntro && <IntroText onComplete={handleIntroComplete} />}
            {showInfoPanel && <InfoPanel onStartExperience={() => { setShowInfoPanel(false); setShowTimeOfDay(true); }} />}
            <VStack spacing={4}>
              {showMoodSelection ? (
                <MoodSelection moods={moodOptions} onMoodSelect={handleMoodSelect} onContinue={handleContinueToGenre} />
              ) : showTimeOfDay ? (
                <>
                  <MotionBox
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
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
              ) : showGenreSelection ? (
                <GenreSelection genres={genreOptions} onGenreSelect={handleGenreSelectAndFetchPlaylists} />
            ) 
            : showPlaylistsDisplay ? (
                <PlaylistsDisplay playlists={fetchedPlaylists} />
            ) 
            : null }
            </VStack>
          </>
        )}
      </Center>
    </Box>
  );
}
