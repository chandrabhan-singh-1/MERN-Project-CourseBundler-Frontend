import {
  Avatar,
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { fileUploadCSS } from '../Auth/Register';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromPlaylist,
  updateProfilePicture,
} from '../../redux/actions/profileActions';
import { cancelSubscription, loadUser } from '../../redux/actions/userActions';
import toast from 'react-hot-toast';
import { profileReducer } from '../../redux/reducers/profileReducer';
import { subscriptionReducer } from '../../redux/reducers/userReducer';

const Profile = ({ user }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(state => state.profile);
  const {
    loading: subLoading,
    message: subMessage,
    error: subError,
  } = useSelector(state => state.subscription);

  const removeFromPlaylistHandler = async id => {
    await dispatch(removeFromPlaylist(id));
    dispatch(loadUser());
  };

  const changeImageSubmitHandler = async (e, image) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('file', image);
    await dispatch(updateProfilePicture(myForm));
    dispatch(loadUser());
  };

  const cancelSubscriptionHandler = async () => {
    await dispatch(cancelSubscription(user));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { duration: 3000 });
      dispatch(profileReducer.actions.clearError());
    }
    if (message) {
      toast.success(message, { duration: 3000 });
      dispatch(profileReducer.actions.clearMessage());
    }
    if (subMessage) {
      toast.success(subMessage, {
        duration: 3000,
      });
      dispatch(subscriptionReducer.actions.clearMessage());
    }
    if (subError) {
      toast.error(subError, {
        duration: 3000,
      });
      dispatch(subscriptionReducer.actions.clearError());
    }
  }, [dispatch, message, error, subError, subMessage]);

  return (
    <Container minH={'90vh'} maxW={'container.lg'} py={'8'}>
      <Heading children="Profile" m="8" textTransform={'uppercase'} />
      <Stack
        justifyContent={'flex-start'}
        direction={['column', 'row']}
        alignItems={'center'}
        spacing={['8', '16']}
        fontSize={'xl'}
        padding={'8'}
      >
        <VStack>
          <Avatar boxSize={'48'} src={user.avatar.url} />
          <Button colorScheme="yellow" variant={'ghost'} onClick={onOpen}>
            Change Image
          </Button>
        </VStack>

        <VStack spacing={'4'} alignItems={['center', 'flex-start']}>
          <HStack>
            <Text children={'Name:'} fontWeight={'bold'} />

            <Text children={user.name} />
          </HStack>{' '}
          <HStack>
            <Text children={'Email:'} fontWeight={'bold'} />

            <Text children={user.email} />
          </HStack>
          <HStack>
            <Text children={'Created At:'} fontWeight={'bold'} />

            <Text children={`${user.createdAt.split('T')[0]} (yyyy-mm-dd)`} />
          </HStack>
          {user.role !== 'admin' && (
            <HStack>
              <Text children="Subscription" fontWeight={'bold'} />
              {user.subscription && user.subscription.status === 'active' ? (
                <Button
                  color={'brown'}
                  variant={'ghost'}
                  onClick={cancelSubscriptionHandler}
                  isLoading={subLoading}
                >
                  Cancel Subscription
                </Button>
              ) : (
                <Link to={'/subscribe'}>
                  <Button colorScheme="yellow">Subscribe</Button>
                </Link>
              )}
            </HStack>
          )}
          <Stack direction={['column', 'row']} alignItems={'center'}>
            <Link to={'/updateprofile'}>
              <Button>Update Profile</Button>
            </Link>

            <Link to={'/changepassword'}>
              <Button>Change Password</Button>
            </Link>
          </Stack>
        </VStack>
      </Stack>

      <Heading
        children={'Playlist'}
        size={'lg'}
        pb={'2'}
        borderBottom={'2px solid yellow'}
        my={'8'}
      />

      {user.playlist.length > 0 && (
        <Stack
          direction={['column', 'row']}
          alignItems={'center'}
          flexWrap={'wrap'}
          p={'4'}
        >
          {user.playlist.map((element, index) => (
            <VStack w={'48'} m={'2'} key={element.course}>
              <Image
                boxSize={'full'}
                objectFit={'contain'}
                src={element.poster}
              />

              <HStack>
                <Link to={`/course/${element.course}`}>
                  <Button variant={'ghost'} colorScheme="yellow">
                    Watch Now
                  </Button>
                </Link>

                <Button
                  onClick={() => removeFromPlaylistHandler(element.course)}
                  isLoading={loading}
                >
                  <RiDeleteBin7Fill />
                </Button>
              </HStack>
            </VStack>
          ))}
        </Stack>
      )}

      <ChangePhotoBox
        changeImageSubmitHandler={changeImageSubmitHandler}
        isOpen={isOpen}
        onClose={onClose}
        loading={loading}
      />
    </Container>
  );
};

export default Profile;

function ChangePhotoBox({
  isOpen,
  onClose,
  changeImageSubmitHandler,
  loading,
}) {
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');

  const changeImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const closeHandler = () => {
    onClose();
    setImagePrev('');
    setImage('');
  };

  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay backdropFilter={'blur(10px)'} />
      <ModalContent>
        <ModalHeader>Change Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={e => changeImageSubmitHandler(e, image)}>
              <VStack spacing={'8'}>
                {imagePrev && <Avatar src={imagePrev} boxSize={'48'} />}

                <Input
                  type={'file'}
                  css={{ '&::file-selector-button': fileUploadCSS }}
                  onChange={changeImage}
                />
                <Button
                  w={'full'}
                  colorScheme="yellow"
                  type="submit"
                  isLoading={loading}
                >
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>

        <ModalFooter>
          <Button mr={'3'} onClick={closeHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
