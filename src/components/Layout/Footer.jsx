import { Box, HStack, Heading, Image, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  TiSocialYoutubeCircular,
  TiSocialInstagramCircular,
} from 'react-icons/ti';
import { DiGithub } from 'react-icons/di';
import logo from '../../assets/images/logo.png';

const Footer = () => {
  return (
    <>
      <Box padding={'4'} bg={'blackAlpha.900'} minH={'10vh'}>
        <Stack
          direction={['column', 'row']}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <VStack alignItems={['center', 'flex-start']}>
            <Heading children={'All rights are Reserved!'} color={'white'} />
            <Heading
              children={`© ChandrabhanSingh`}
              color={'yellow.400'}
              fontFamily={'body'}
              size={'md'}
              _hover={{ color: 'white' }}
            />
          </VStack>
          <Image
            src={logo}
            boxSize={'100px'}
            fit={'contain'}
            alt="Course Bundler Logo"
          />

          <HStack
            spacing={['2', '10']}
            justifyContent={'center'}
            color={'white'}
            fontSize={'50'}
            className="footerAnchor"
          >
            <a href="https://youtube.com/" target="blank">
              <TiSocialYoutubeCircular />
            </a>
            <a href="https://instagram.com/" target="blank">
              <TiSocialInstagramCircular />
            </a>
            <a href="https://github.com/" target="blank">
              <DiGithub />
            </a>
          </HStack>
        </Stack>
      </Box>
    </>
  );
};

export default Footer;
