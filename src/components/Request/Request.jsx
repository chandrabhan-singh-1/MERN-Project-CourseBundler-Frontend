import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { courseRequest } from '../../redux/actions/otherActions';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { otherReducer } from '../../redux/reducers/otherReducer';

const Request = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(state => state.other);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(courseRequest(name, email, course));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(otherReducer.actions.clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(otherReducer.actions.clearMessage());
    }
  }, [dispatch, error, message]);

  return (
    <Container minH={'90vh'} w={'full'}>
      <VStack
        h={'full'}
        justifyContent={'center'}
        spacing={'8'}
        marginTop={'8'}
        w={'full'}
      >
        <Heading children="Request New Course" />

        <form style={{ width: '100%' }} onSubmit={submitHandler}>
          <Box my={'6'}>
            <FormLabel htmlFor="name" fontSize={'lg'} children="Name" />
            <Input
              required
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name"
              type="text"
              focusBorderColor="yellow.500"
              size={'lg'}
            />
          </Box>
          <Box my={'6'}>
            <FormLabel htmlFor="email" fontSize={'lg'} children="Email Id" />
            <Input
              required
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              type="email"
              focusBorderColor="yellow.500"
              size={'lg'}
            />
          </Box>
          <Box my={'6'}>
            <FormLabel htmlFor="course" fontSize={'lg'} children="Course" />
            <Textarea
              required
              id="course"
              value={course}
              onChange={e => setCourse(e.target.value)}
              placeholder="Explain the course..."
              focusBorderColor="yellow.500"
              size={'lg'}
            />
          </Box>
          <Button
            my={'4'}
            colorScheme={'yellow'}
            type="submit"
            isLoading={loading}
          >
            Submit
          </Button>

          <Box my={'2'}>
            Check available courses!{' '}
            <Link to={'/courses'}>
              <Button colorScheme="yellow" variant={'link'}>
                Click
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Request;
