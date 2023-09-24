import {
  Button,
  Container,
  Grid,
  Heading,
  Image,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar';
import { fileUploadCSS } from '../Auth/Register';
import cursor from '../../assets/images/cursor2.png';
import { createCourse } from '../../redux/actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { adminReducer } from '../../redux/reducers/adminReducer';

const fileUploadStyle = {
  '&::file-selector-button': {
    ...fileUploadCSS,
    color: 'purple',
  },
};

const CreateCourse = () => {
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [createdBy, setCreatedBy] = useState('');
  // const [category, setCategory] = useState('');
  // const [image, setImage] = useState('');
  // const [imagePrev, setImagePrev] = useState('');
  const [titleRef, descriptionRef, createdByRef, categoryRef] = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');

  const categories = [
    'Web Development',
    'Artificial Intelligence',
    'Data Structures & Algorithms',
    'App Development',
    'Data Science',
    'Game Development',
  ];

  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const dispatch = useDispatch();
  const { error, loading, message } = useSelector(state => state.admin);

  const submitHandler = e => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append('title', titleRef.current.value);
    myForm.append('description', descriptionRef.current.value);
    myForm.append('createdBy', createdByRef.current.value);
    myForm.append('category', categoryRef.current.value);
    myForm.append('file', image);

    dispatch(createCourse(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(adminReducer.actions.clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(adminReducer.actions.clearError());
    }
  }, [dispatch, loading, error, message]);

  return (
    <Grid
      css={{
        cursor: `url(${cursor}), default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Container py={'16'}>
        <form onSubmit={submitHandler}>
          <Heading
            textTransform={'uppercase'}
            children="Create Course"
            my={'16'}
            textAlign={['center', 'left']}
          />

          <VStack m={'auto'} spacing={'8'}>
            <Input
              // value={title}
              // onChange={e => setTitle(e.target.value)}
              ref={titleRef}
              placeholder="Title"
              type="text"
              focusBorderColor="purple.300"
            />
            <Input
              // value={description}
              // onChange={e => setDescription(e.target.value)}
              ref={descriptionRef}
              placeholder="Description"
              type="text"
              focusBorderColor="purple.300"
            />
            <Input
              // value={createdBy}
              // onChange={e => setCreatedBy(e.target.value)}
              ref={createdByRef}
              placeholder="Creator Name"
              type="text"
              focusBorderColor="purple.300"
            />

            <Select
              focusBorderColor="purple.300"
              // value={category}
              // onChange={e => setCategory(e.target.value)}
              ref={categoryRef}
            >
              {categories.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Select>

            <Input
              required
              accept="image/*"
              type="file"
              focusBorderColor="purple.300"
              css={fileUploadStyle}
              onChange={changeImageHandler}
            />

            {imagePrev && (
              <Image src={imagePrev} boxSize={'64'} objectFit={'contain'} />
            )}

            <Button
              isLoading={loading}
              width={'full'}
              colorScheme="purple"
              type="submit"
            >
              Create
            </Button>
          </VStack>
        </form>
      </Container>

      <Sidebar />
    </Grid>
  );
};

export default CreateCourse;
