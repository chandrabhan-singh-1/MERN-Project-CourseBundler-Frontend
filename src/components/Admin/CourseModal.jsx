import {
  Box,
  Button,
  Grid,
  Heading,
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
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';

const CourseModal = ({
  isOpen,
  onClose,
  id,
  deleteLectureHandler,
  courseTitle,
  lectures = [],
  addLectureHandler,
  loading,
  adminLoad,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [videoPrev, setVideoPrev] = useState('');

  const changeVideoHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  const closeHandler = () => {
    setTitle('');
    setDescription('');
    setVideo('');
    setVideoPrev('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      size="6xl"
      onClose={closeHandler}
      scrollBehavior={'outside'}
      closeOnOverlayClick={true}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{courseTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={'8, 16'}>
          <Grid templateColumns={['1fr', '3fr 1fr']}>
            <Box p={['0', '16']}>
              <Box my={'2'}>
                <Heading children={courseTitle} />
                <Heading children={`#${id}`} size={'sm'} opacity={'0.4'} />
              </Box>

              <Heading children={'Lectures'} size={'lg'} />
              {lectures.map((item, index) => (
                <VideoCard
                  key={item._id}
                  title={item.title}
                  description={item.description}
                  num={index + 1}
                  lectureId={item._id}
                  courseId={id}
                  deleteLecture2Handler={deleteLectureHandler}
                  adminLoad={adminLoad}
                />
              ))}
            </Box>
            <Box>
              <form
                onSubmit={e =>
                  addLectureHandler(e, id, title, description, video)
                }
              >
                <VStack spacing={'4'}>
                  <Heading
                    children={'Add Lecture'}
                    size={'md'}
                    textTransform={'uppercase'}
                  />
                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                  <Input
                    accept="video/mp4"
                    required
                    type={'file'}
                    focusBorderColor="purple.300"
                    css={{
                      '&::file-selector-button': {
                        color: 'purple',
                        cursor: 'pointer',
                        marginLeft: '-5%',
                        width: '110%',
                        border: 'none',
                        height: '100%',
                        backgroundColor: 'white',
                      },
                    }}
                    onChange={changeVideoHandler}
                  />

                  {videoPrev && (
                    <video
                      controlsList="nodownload"
                      controls
                      src={videoPrev}
                    ></video>
                  )}

                  <Button
                    w={'full'}
                    colorScheme="purple"
                    type="submit"
                    isLoading={loading}
                  >
                    Add Lecture
                  </Button>
                </VStack>
              </form>
            </Box>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button onClick={closeHandler}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CourseModal;

function VideoCard({
  title,
  description,
  num,
  lectureId,
  courseId,
  deleteLecture2Handler,
  adminLoad,
}) {
  return (
    <Stack
      direction={['column', 'row']}
      my={'8'}
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(107, 70, 193, 0.5)'}
      justifyContent={['flex-start', 'space-between']}
      p={['4', '8']}
    >
      <Box>
        <Heading size={'sm'} children={`#${num} ${title}`} />
        <Text children={description} />
      </Box>
      <Button
        color={'purple.600'}
        onClick={() => deleteLecture2Handler(courseId, lectureId)}
        isLoading={adminLoad}
      >
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  );
}
