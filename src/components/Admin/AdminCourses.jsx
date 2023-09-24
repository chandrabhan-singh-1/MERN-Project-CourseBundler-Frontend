import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

import cursor from '../../assets/images/cursor2.png';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import CourseModal from './CourseModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses, getLectures } from '../../redux/actions/courseActions';
import {
  addLecture,
  deleteCourse,
  deleteLecture,
} from '../../redux/actions/adminActions';
import toast from 'react-hot-toast';
import { adminReducer } from '../../redux/reducers/adminReducer';

const AdminCourses = () => {
  const [courseId, setCourseId] = useState('');
  const [courseTitle, setCourseTitle] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const { courses, lectures, loading } = useSelector(state => state.course);
  const {
    message: adminMess,
    error: adminErr,
    loading: adminLoad,
  } = useSelector(state => state.admin);

  const courseDetailsHandler = (mappedCourseId, mappedCourseTitle) => {
    dispatch(getLectures(mappedCourseId));
    setCourseId(mappedCourseId);
    setCourseTitle(mappedCourseTitle);
    onOpen();
  };
  const deleteCourseHandler = courseId => {
    dispatch(deleteCourse(courseId));
  };
  const deleteLectureHandler = async (courseId, lectureId) => {
    await dispatch(deleteLecture(courseId, lectureId));
    dispatch(getLectures(courseId));
  };
  const addLectureHandler = async (e, courseId, title, description, video) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('file', video);

    await dispatch(addLecture(courseId, myForm));
    dispatch(getLectures(courseId));
  };

  useEffect(() => {
    if (adminErr) {
      toast.error(adminErr);
      dispatch(adminReducer.actions.clearError());
    }
    if (adminMess) {
      toast.success(adminMess);
      dispatch(adminReducer.actions.clearMessage());
    }

    dispatch(getAllCourses());
  }, [dispatch, adminErr, adminMess]);

  return (
    <Grid
      css={{
        cursor: `url(${cursor}), default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Box p={['0', '8']} overflowX={'auto'}>
        <Heading
          textTransform={'uppercase'}
          children="All Courses"
          my={'16'}
          textAlign={['center', 'left']}
        />

        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size={'lg'}>
            <TableCaption>All available courses in the data base.</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {courses.map(item => (
                <Row
                  key={item._id}
                  item={item}
                  courseDetails2Handler={courseDetailsHandler}
                  deleteButton2Handler={deleteCourseHandler}
                  adminLoad={adminLoad}
                  loading={loading}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <CourseModal
          isOpen={isOpen}
          onClose={onClose}
          id={courseId}
          deleteLectureHandler={deleteLectureHandler}
          addLectureHandler={addLectureHandler}
          courseTitle={courseTitle}
          lectures={lectures}
          loading={loading}
          adminLoad={adminLoad}
        />
      </Box>
      <Sidebar />
    </Grid>
  );
};

export default AdminCourses;

function Row({
  item,
  courseDetails2Handler,
  deleteCourse2Handler,
  adminLoad,
  loading,
}) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.poster.url} />
      </Td>
      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>
      <Td>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => courseDetails2Handler(item._id, item.title)}
            variant={'outline'}
            color={'purple.500'}
            isLoading={loading}
          >
            View Lectures
          </Button>
          <Button
            onClick={() => deleteCourse2Handler(item._id)}
            color={'purple.600'}
            isLoading={adminLoad}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
