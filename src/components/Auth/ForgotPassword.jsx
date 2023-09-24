import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { forgotPassword } from '../../redux/actions/profileActions';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { profileReducer } from '../../redux/reducers/profileReducer';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const { loading, message, error } = useSelector(state => state.profile);

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();

    dispatch(forgotPassword(email));
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
  }, [dispatch, message, error]);

  return (
    <Container py={'16'} h={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          children="Forget Password"
          my={'16'}
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        />

        <VStack spacing={'8'}>
          <Input
            required
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="abc@gmail.com"
            type="email"
            focusBorderColor="yellow.500"
          />
          <Button
            type="submit"
            w={'full'}
            colorScheme="yellow"
            isLoading={loading}
          >
            Send Reset Link
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ForgotPassword;
