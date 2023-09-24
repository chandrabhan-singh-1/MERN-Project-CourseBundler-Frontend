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
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { contactUs } from '../../redux/actions/otherActions';
import { otherReducer } from '../../redux/reducers/otherReducer';
import toast from 'react-hot-toast';

const Contact = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(state => state.other);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      contactUs(
        nameRef.current.value,
        emailRef.current.value,
        messageRef.current.value
      )
    );
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
    <Container minH={'90vh'}>
      <VStack
        h={'full'}
        justifyContent={'center'}
        spacing={'8'}
        marginTop={'8'}
      >
        <Heading children="Contact Us" />

        <form style={{ width: '100%' }} onSubmit={submitHandler}>
          <Box my={'6'}>
            <FormLabel fontSize={'lg'} htmlFor="name" children="Name" />
            <Input
              size={'lg'}
              required
              id="name"
              ref={nameRef}
              placeholder="Name"
              type="text"
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'6'}>
            <FormLabel fontSize={'lg'} htmlFor="email" children="Email Id" />
            <Input
              size={'lg'}
              required
              id="email"
              ref={emailRef}
              placeholder="abc@gmail.com"
              type="email"
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'6'}>
            <FormLabel fontSize={'lg'} htmlFor="text" children="Message" />
            <Textarea
              size={'lg'}
              required
              id="message"
              ref={messageRef}
              placeholder="Enter your message"
              focusBorderColor="yellow.500"
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
            Request for a course?{' '}
            <Link to={'/request'}>
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

export default Contact;
