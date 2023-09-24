import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../../redux/actions/userActions';
import { useDispatch } from 'react-redux';

export const fileUploadCSS = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  border: 'none',
  height: '100%',
  color: '#ecc94b',
  backgroudColor: 'white',
};

const fileUploadStyle = {
  '&::file-selector-button': fileUploadCSS,
};

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState('I am image.');

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
  const submitHandler = e => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('password', password);
    myForm.append('file', image);

    dispatch(register(myForm));
  };

  return (
    <>
      <Container minH={'95vh'}>
        <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
          <Heading children={'Registration'} textTransform={'uppercase'} />
          <form onSubmit={submitHandler} style={{ width: '100%' }}>
            <Box my={'4'} display={'flex'} justifyContent={'center'}>
              <Avatar src={imagePrev} size={'2xl'} />
            </Box>
            <Box my={'4'}>
              <FormLabel htmlFor="name" children="Name" />
              <Input
                required
                id="name"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your Name"
                type="text"
                focusBorderColor="yellow.500"
                autoComplete="off"
              />
            </Box>
            <Box my={'4'}>
              <FormLabel htmlFor="email" children="Email Id" />
              <Input
                required
                id="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="abc@gmail.com"
                type="email"
                focusBorderColor="yellow.500"
                autoComplete="off"
              />
            </Box>
            <Box my={'4'}>
              <FormLabel htmlFor="password" children="Password" />
              <Input
                required
                id="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter the Password"
                type="password"
                focusBorderColor="yellow.500"
                autoComplete="off"
              />
            </Box>
            <Box my={'4'}>
              <FormLabel htmlFor="avatar" children="Choose Avatar" />
              <Input
                accept="image/*"
                required
                id="avatar"
                name="avatar"
                type={'file'}
                focusBorderColor="yellow.500"
                css={fileUploadStyle}
                onChange={changeImageHandler}
                autoComplete="off"
              />
            </Box>

            <Button my={'4'} colorScheme="yellow" type="submit">
              Sign Up
            </Button>

            <Box my={'4'}>
              Already Registered?{' '}
              <Link to={'/login'}>
                <Button colorScheme="yellow" variant={'link'}>
                  Login
                </Button>{' '}
                here
              </Link>
            </Box>
          </form>
        </VStack>
      </Container>
    </>
  );
};

export default Register;
