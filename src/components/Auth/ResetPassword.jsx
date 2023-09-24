import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/actions/profileActions';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { profileReducer } from '../../redux/reducers/profileReducer';

const ResetPassword = () => {
  const [password, setPassword] = useState('');

  const params = useParams();

  const { loading, message, error } = useSelector(state => state.profile);

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();

    dispatch(resetPassword(params.token, password));
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
          children="Reset Password"
          my={'16'}
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        />

        <VStack spacing={'8'}>
          <Input
            required
            id="email"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter New Password"
            type="password"
            focusBorderColor="yellow.500"
          />
          <Button
            type="submit"
            w={'full'}
            colorScheme="yellow"
            isLoading={loading}
          >
            Reset Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;
