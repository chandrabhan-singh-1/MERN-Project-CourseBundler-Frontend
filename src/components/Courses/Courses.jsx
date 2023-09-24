import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  addToPlaylist,
  getAllCourses,
} from '../../redux/actions/courseActions';
import toast from 'react-hot-toast';
import { courseReducer } from '../../redux/reducers/courseReducer';
import { loadUser } from '../../redux/actions/userActions';

const Course = ({
  views,
  title,
  imageSrc,
  id,
  creator,
  description,
  lectureCount,
  loading,
  addToPlaylistHandler,
}) => {
  return (
    <VStack className="course" alignItems={['center', 'flex-start']}>
      <Image src={imageSrc} boxSize={'60'} p={'2'} objectFit={'contain'} />
      <Heading
        textAlign={['center', 'flex-start']}
        maxW={'200px'}
        size={'md'}
        fontFamily={'sans-serif'}
        noOfLines={'3'}
        children={title}
      />
      <Text children={description} noOfLines={2} />
      <HStack>
        <Text
          fontWeight={'bold'}
          textTransform={'uppercase'}
          children={'creator ='}
          fontSize={'sm'}
        />
        <Text
          fontFamily={'body'}
          fontSize={'md'}
          textTransform={'uppercase'}
          children={creator}
        />
      </HStack>
      <Heading
        textAlign={'center'}
        size={'xs'}
        children={`Lectures = ${lectureCount}`}
        textTransform={'uppercase'}
      />
      <Heading
        size={'xs'}
        children={`Views = ${views}`}
        textTransform={'uppercase'}
      />

      <Stack direction={['column', 'row']} alignItems={'center'}>
        <Link to={`/courses/${id}`}>
          <Button colorScheme="yellow">Watch Now</Button>
        </Link>
        <Button
          variant={'ghost'}
          isLoading={loading}
          colorScheme="yellow"
          onClick={() => addToPlaylistHandler(id)}
        >
          Add to Playlist
        </Button>
      </Stack>
    </VStack>
  );
};

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();
  const { loading, courses, error, message } = useSelector(
    state => state.course
  );

  useEffect(() => {
    dispatch(getAllCourses(keyword, category));

    if (error) {
      toast.error(error, { duration: 3000 });
      dispatch(courseReducer.actions.clearError());
    }
    if (message) {
      toast.success(message, { duration: 3000 });
      dispatch(courseReducer.actions.clearMessage());
    }
  }, [dispatch, keyword, category, error, message]);

  const addToPlaylistHandler = async courseId => {
    await dispatch(addToPlaylist(courseId));
    dispatch(loadUser());
  };

  const categories = [
    'All',
    'Web Development',
    'Artificial Intelligence',
    'Data Structures & Algorithms',
    'App Development',
    'Data Science',
    'Game Development',
  ];

  return (
    <>
      <Container minH={'95vh'} maxW={'container.lg'} paddingY={'8'}>
        <Heading children="All Courses" m={'8'} />

        <Input
          type="text"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="Search the course..."
          focusBorderColor="yellow.500"
        />

        <HStack overflowX={'auto'} paddingY={'4'} mb={'4'}>
          {categories.map((item, index) => (
            <Button
              key={index}
              minW={'60'}
              onClick={() => setCategory(() => (item === 'All' ? '' : item))}
            >
              <Text children={item} />
            </Button>
          ))}
        </HStack>
        <Stack
          direction={['column', 'row']}
          flexWrap={'wrap'}
          justifyContent={['flex-start', 'space-evenly']}
          alignItems={['center', 'flex-start']}
        >
          {courses.length > 0 ? (
            courses.map(item => (
              <Course
                key={item._id}
                title={item.title}
                description={item.description}
                views={item.views}
                imageSrc={item.poster.url}
                id={item._id}
                creator={item.createdBy}
                lectureCount={item.numOfVideos}
                loading={loading}
                addToPlaylistHandler={addToPlaylistHandler}
              />
            ))
          ) : (
            <Heading mt={'8'} children={'Course Not Found!'} />
          )}
        </Stack>
      </Container>
    </>
  );
};

export default Courses;
