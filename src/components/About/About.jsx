import {
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import my from '../../assets/images/my.png';
import { Link } from 'react-router-dom';
import introVideo from '../../assets/videos/introVideo.mp4';
import { RiSecurePaymentFill } from 'react-icons/ri';
import termsAndCond from '../../assets/docs/TandC.js';

const About = () => {
  return (
    <Container maxW={'container.lg'} padding={'16'} boxShadow={'lg'}>
      <Heading children="About Us" textAlign={['center', 'left']} />

      <Founder />

      <Stack m={'8'} direction={['column', 'row']} alignItems={'center'}>
        <Text fontFamily={'cursive'} m={'8'} textAlign={['center', 'left']}>
          We are a video streaming platform with some premium courses available
          only for premium users.
        </Text>

        <Link to="/subscribe">
          <Button variant={'ghost'} colorScheme="yellow">
            Checkout Our Plans
          </Button>
        </Link>
      </Stack>

      <VideoPlayer />

      <TandC termsAndConditions={termsAndCond} />

      <HStack my={'4'} p={'4'}>
        <RiSecurePaymentFill />
        <Heading
          children={'Payment is secured by RazorPay.'}
          fontSize={'xs'}
          fontFamily={'sans-serif'}
          textTransform={'uppercase'}
        />
      </HStack>
    </Container>
  );
};

const Founder = () => (
  <>
    <Stack direction={['column', 'row']} spacing={['4', '16']} padding={'8'}>
      <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
        <Avatar src={my} boxSize={['40', '48']} />
        <Text children="Co-Founder" opacity={0.7} />
      </VStack>
      <VStack justifyContent={'center'}>
        <Heading children="Chandrabhan Singh" size={['md', 'xl']} />
        <Text
          textAlign={['center', 'left']}
          children={
            'Hi, My name is Chandrabhan Singh. I am a Full-Stack Web Developer. I live in Indore, M.P.'
          }
        />
      </VStack>
    </Stack>
  </>
);

const VideoPlayer = () => (
  <Box>
    <video
      controls
      controlsList="nodownload nofullscreen noremoteplayback"
      disablePictureInPicture
      disableRemotePlayback
      src={introVideo}
    ></video>
  </Box>
);

const TandC = ({ termsAndConditions }) => (
  <Box>
    <Heading
      size={'md'}
      children="Terms & Conditions"
      textAlign={['center', 'left']}
      my={'4'}
    />
    <Box h={'sm'} p={'4'} overflowY={'scroll'}>
      <Text
        textAlign={['center', 'left']}
        letterSpacing={'widest'}
        fontFamily={'heading'}
      >
        {termsAndConditions}
      </Text>
      <Heading
        my={'4'}
        size={'xs'}
        children={'Refund only applicable for cancellation within 7 days.'}
      />
    </Box>
  </Box>
);

export default About;
