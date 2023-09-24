import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { CgGoogle, CgYoutube } from 'react-icons/cg';
import { SiCoursera, SiUdemy } from 'react-icons/si';
import { DiAws } from 'react-icons/di';
import './home.css';

import vg from '../../assets/images/student.png';
import introVideo from '../../assets/videos/introVideo.mp4';

const Home = () => {
  return (
    <>
      <section className="home">
        <div className="container">
          <Stack
            direction={['column', 'column', 'row']}
            height="100%"
            justifyContent={['center', 'space-between']}
            alignItems="center"
            spacing={['16', '16', '56']}
          >
            <VStack
              width={'full'}
              alignItems={['center', 'flex-start']}
              spacing={'12'}
              ml={['0', '16']}
            >
              <Heading
                textAlign={['center', 'left']}
                children="LEARN FROM THE EXPERTS"
                size={'2xl'}
              />
              <Text
                fontSize={'2xl'}
                fontFamily={'cursive'}
                textAlign={['center', 'left']}
                children="Get Premium Content at a Reasonable Price"
              />
              <Link to="/course">
                <Button size={'lg'} colorScheme="yellow">
                  Explore Now
                </Button>
              </Link>
            </VStack>

            <Image
              className="vg-image"
              boxSize={'xl'}
              src={vg}
              objectFit={'contain'}
            />
          </Stack>
        </div>

        <Box padding={'8'} bg={'blackAlpha.800'}>
          <Heading
            children="OUR BRANDS"
            textAlign={'center'}
            fontFamily={'body'}
            color={'yellow.400'}
          />
          <HStack
            className="brandsBanner"
            justifyContent={'space-evenly'}
            marginTop={'4'}
          >
            <CgGoogle />
            <CgYoutube />
            <SiCoursera />
            <SiUdemy />
            <DiAws />
          </HStack>
        </Box>

        <div className="container2">
          <video
            controls
            src={introVideo}
            controlsList="nodownload nofullscreen"
            disableRemotePlayback
            disablePictureInPicture
          ></video>
        </div>
      </section>
    </>
  );
};

export default Home;
