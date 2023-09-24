import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import introVideo from '../../assets/videos/introVideo.mp4';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getLectures } from '../../redux/actions/courseActions';

const CoursePage = ({ user }) => {
  // const lectureTitle = 'Lecture Title';

  const [lectureNumber, setLectureNumber] = useState(0);

  const dummyLecture = [
    {
      _id: 'kdgksdjjdfl',
      title: 'Lectures will be added soon!',
      description:
        'Currently! This course does not have any Lecture. Lectures will be added soon.',
      video: {
        url: introVideo,
      },
    },
  ];

  const { lectures: onlineLectures } = useSelector(state => state.course);

  const lectures = onlineLectures.length > 0 ? onlineLectures : dummyLecture;

  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(getLectures(params.id));
  }, [dispatch, params.id]);

  if (
    user.role !== 'admin' &&
    (user.subscription === undefined || user.subscription.status !== 'active')
  ) {
    return <Navigate to={'/subscribe'} />;
  }

  return (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']} pt={'16'} pl={'2'}>
      <Box>
        <video
          width={'90%'}
          controls
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src={lectures[lectureNumber].video.url}
          style={{ borderRadius: '15px', margin: 'auto' }}
        ></video>

        <Heading
          children={`${lectureNumber + 1}. ${lectures[lectureNumber].title}`}
          m={'4'}
        />
        <Heading children={'Description'} m={'4'} fontSize={'2xl'} />

        <Text
          m={'4'}
          children={lectures[lectureNumber].description}
          fontSize={'xl'}
        />
      </Box>

      <VStack>
        {lectures.map((element, index) => (
          <button
            key={element._id}
            onClick={() => setLectureNumber(index)}
            style={{
              width: '100%',
              padding: '1rem',
              textAlign: 'center',
              margin: 0,
              borderBottom: '2px solid rgba(0,0,0, 0.2)',
            }}
          >
            <Text noOfLines={'1'} fontSize={'xl'}>
              {index + 1}. {element.title}
            </Text>
          </button>
        ))}
      </VStack>
    </Grid>
  );
};

export default CoursePage;
