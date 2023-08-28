import React from 'react';
import { Box, Text, Image, Spinner, Grid, Flex, Link, Badge, HStack, Icon } from '@chakra-ui/react';
import { FaUserAlt, FaMusic } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const PlaylistsDisplay = ({ playlists }) => {
  if (!playlists) {
    return <Spinner />;
  }

  const randomPlaylists = playlists.sort(() => 0.5 - Math.random()).slice(0, 9);

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {randomPlaylists.map((playlist, index) => (
          <Link key={index} href={playlist.external_urls.spotify} isExternal _hover={{ textDecoration: 'none' }}>
            <MotionFlex
              whileHover={{ scale: 1.05 }}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Image src={playlist.images[0]?.url} alt={playlist.name} h="100%" w="100px" objectFit="cover" />
              <Box p="6" flex="1">
                <Text 
                  fontWeight="bold" 
                  fontSize="xl" 
                  display="-webkit-box"
                  WebkitLineClamp="2"
                  WebkitBoxOrient="vertical"
                  overflow="hidden"
                  textColor="white"
                >
                  {playlist.name}
                </Text>
                <HStack spacing="2">
                  <Badge colorScheme="blue" borderRadius="full" px="2">
                    <HStack spacing="1">
                      <Icon as={FaUserAlt} />
                      <Text>{playlist.owner?.display_name}</Text>
                    </HStack>
                  </Badge>
                  <Badge colorScheme="green" borderRadius="full" px="2">
                    <HStack spacing="1">
                      <Icon as={FaMusic} />
                      <Text>{playlist.tracks.total}</Text>
                    </HStack>
                  </Badge>
                </HStack>
              </Box>
            </MotionFlex>
          </Link>
        ))}
      </Grid>
    </MotionBox>
  );
};

export default PlaylistsDisplay;
