import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { server } from '../../redux/store';
import { buySubscription } from '../../redux/actions/userActions';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import student from '../../assets/images/student.png';
import { courseReducer } from '../../redux/reducers/courseReducer';
import { subscriptionReducer } from '../../redux/reducers/userReducer';

const Subscribe = ({ user }) => {
  const [key, setKey] = useState('');

  const dispatch = useDispatch();

  const { loading, subscriptionId, error } = useSelector(
    state => state.subscription
  );
  const { error: courseError } = useSelector(state => state.course);

  const subscribeHandler = async () => {
    const {
      data: { key },
    } = await axios.get(`${server}/razorpaykey`);
    setKey(key);
    dispatch(buySubscription());
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { duration: 3000 });
      dispatch(subscriptionReducer.actions.clearError());
    }
    if (courseError) {
      toast.error(courseError, { duration: 3000 });
      dispatch(courseReducer.actions.clearError());
    }

    if (subscriptionId) {
      const openPopup = () => {
        const options = {
          key: key,
          name: 'Course Bundler',
          description: 'Congrats! Now you can access all the premium content.',
          image: student,
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentverification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: '',
          },
          notes: {
            address: 'Bhamsa from NBH',
          },
          theme: {
            color: '#FFC800',
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      };
      openPopup();
    }
  }, [dispatch, subscriptionId, error, user, key, courseError]);

  return (
    <Container h={'90vh'} p={'16'}>
      <Heading children={'Welcome'} my={'8'} textAlign={'center'} />

      <VStack
        boxShadow={'lg'}
        alignItems={'stretch'}
        borderRadius={'lg'}
        spacing={'0'}
      >
        <Box bg={'yellow.400'} p={'4'} css={{ borderRadius: '8px 8px 0 0' }}>
          <Text children={'Pro Pack - ₹99.00'} color={'black'} />
        </Box>
        <Box p={'4'}>
          <VStack textAlign={'center'} px={'8'} mt={'4'} spacing={'8'}>
            <Text children={'Join Pro Pack & get access to all content.'} />
            <Heading size={'md'} children="₹99 only" />
          </VStack>
          <Button
            my={'8'}
            w={'full'}
            onClick={subscribeHandler}
            colorScheme="yellow"
            isLoading={loading}
          >
            Subscribe Now
          </Button>
        </Box>
        <Box
          bg={'blackAlpha.600'}
          p={'4'}
          css={{ borderRadius: '0 0 8px 8px' }}
        >
          <Heading
            size={'sm'}
            children="100% refund at cancellation"
            color={'white'}
            textTransform={'uppercase'}
          />

          <Text
            fontSize={'xs'}
            color={'white'}
            children={'Terms & Conditions Applied'}
          />
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
