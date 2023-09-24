import React from 'react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/actions/userActions';
import { useDispatch } from 'react-redux';

const LinkBtn = ({ url = '/', title = 'Home', onClose }) => (
  <Link to={url} onClick={onClose}>
    <Button
      variant={'ghost'}
      fontSize={'xl'}
      fontFamily={'roboto'}
      letterSpacing={'2px'}
      fontWeight={'thin'}
      _hover={{ background: 'yellow.400' }}
    >
      {title}
    </Button>
  </Link>
);

const Header = ({ isAuthenticated = false, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <ColorModeSwitcher />
      <Button
        onClick={onOpen}
        colorScheme="yellow"
        width={'12'}
        height={'12'}
        rounded={'xl'}
        position={'fixed'}
        top={'3'}
        left={'4'}
        zIndex={'overlay'}
        _hover={{
          transform: 'scale(1.1)',
          opacity: 0.9,
        }}
      >
        <RiMenu5Fill />
      </Button>

      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay backdropFilter={'blur(5px)'} />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={'1px'}>COURSE BUNDLER</DrawerHeader>
          <DrawerBody>
            <VStack marginTop={'4'} spacing={'8'} alignItems={'flex-start'}>
              <LinkBtn onClose={onClose} url="/" title="Home" />
              <LinkBtn onClose={onClose} url="/courses" title="All Courses" />
              <LinkBtn
                onClose={onClose}
                url="/request"
                title="Request Course"
              />
              <LinkBtn onClose={onClose} url="/contact" title="Contact Us" />
              <LinkBtn onClose={onClose} url="/about" title="About Us" />

              <HStack
                justifyContent={'space-evenly'}
                position={'absolute'}
                bottom={'4'}
                width={'80%'}
              >
                {isAuthenticated ? (
                  <>
                    <VStack>
                      <HStack>
                        <Link to={'/profile'} onClick={onClose}>
                          <Button
                            variant={'ghost'}
                            colorScheme="green"
                            fontSize={'lg'}
                          >
                            Profile
                          </Button>
                        </Link>
                        <Button
                          variant={'ghost'}
                          colorScheme="red"
                          onClick={logoutHandler}
                          fontSize={'lg'}
                        >
                          <RiLogoutBoxLine />
                          Logout
                        </Button>
                      </HStack>

                      {user && user.role === 'admin' && (
                        <Link to={'/admin/dashboard'} onClick={onClose}>
                          <Button
                            colorScheme="purple"
                            variant={'ghost'}
                            fontSize={'lg'}
                          >
                            <RiDashboardFill style={{ marginRight: '4px' }} />
                            Dashboard
                          </Button>
                        </Link>
                      )}
                    </VStack>
                  </>
                ) : (
                  <>
                    <Link to={'/login'} onClick={onClose}>
                      <Button colorScheme="yellow">Log In</Button>
                    </Link>
                    <Text fontSize={'xl'} fontFamily={'mono'}>
                      or
                    </Text>
                    <Link to={'/register'} onClick={onClose}>
                      <Button colorScheme="yellow">Sign Up</Button>
                    </Link>
                  </>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
