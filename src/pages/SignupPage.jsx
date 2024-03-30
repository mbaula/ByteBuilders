import React from 'react';
import {
  Box, Button, FormControl, Input, VStack, useToast, Heading, useColorModeValue,
} from '@chakra-ui/react';
import bytebuilderlogo from '.././assets/bytebuilder-logo.png';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignupPage = () => {
  const toast = useToast();
  const formBackground = useColorModeValue('white', 'gray.700');
  const inputBackground = useColorModeValue('gray.100', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');
  const boxShadow = useColorModeValue('0px 4px 25px -2px rgba(0, 0, 0, 0.4)', '0px 4px 25px -2px rgba(255, 255, 255, 0.1)');

  const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{7,}$');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: "Passwords don't match.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!passwordRegex.test(password)) {
      toast({
        title: 'Error',
        description: "Password must be at least 7 characters, include at least one uppercase letter, one lowercase letter, and one number.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const data = {
      username: formData.get('username'),
      email: formData.get('email'),
      password,
      profile: {
        fullName: formData.get('fullName'),
        phoneNumber: formData.get('phoneNumber'),
      },
    };

    try {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();
      if (response.ok) {
        toast({
          title: 'Account created.',
          description: json.message || "You've successfully signed up!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        login(); 
        navigate('/'); 
      } else {
        throw new Error(json.error || 'Something went wrong');
      }
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Navbar />
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgImage={bytebuilderlogo}
        bgPos="center"
        bgSize={{ base: "cover", md: "contain" }}
        bgRepeat={'no-repeat'}
        opacity="0.1"
        zIndex="-1"
        minH={{ base: "auto", md: "100vh" }}
        pt={10}
      />
      <VStack
        mt={{ base: "20vh", md: "3vh" }}
        spacing={8}
        align="stretch"
        justifyContent="center"
        bg={formBackground}
        p={{ base: 4, sm: 8 }}
        m="auto"
        borderRadius="80px"
        boxShadow={boxShadow}
        width={{ base: "90vw", sm: "60vw", md: "30vw", lg: "30vw" }}
        height="auto"
        maxWidth="100%"
        overflow="auto"
        zIndex="10"
      >
        <Heading
          as="h1"
          textAlign="center"
          mb={6}
          fontFamily="Lato, sans-serif"
          fontSize={{ base: "36px", md: "48px" }}
          color={textColor}
        >
          Sign Up
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="username" isRequired mb={6}>
            <Input name="username" type="text" placeholder="Username" bg={inputBackground} color={textColor}/>
          </FormControl>
          <FormControl id="fullName" isRequired mb={6}>
            <Input name="fullName" type="text" placeholder="Full Name" bg={inputBackground} color={textColor}/>
          </FormControl>
          <FormControl id="email" isRequired mb={6}>
            <Input name="email" type="email" placeholder="Email Address" bg={inputBackground} color={textColor}/>
          </FormControl>
          <FormControl id="password" isRequired mb={6}>
            <Input name="password" type="password" placeholder="Enter Password" bg={inputBackground} color={textColor}/>
          </FormControl>
          <FormControl id="confirmPassword" isRequired mb={6}>
            <Input name="confirmPassword" type="password" placeholder="Confirm Password" bg={inputBackground} color={textColor}/>
          </FormControl>
          <FormControl id="phoneNumber" isRequired mb={6}>
            <Input name="phoneNumber" type="tel" placeholder="Phone Number" bg={inputBackground} color={textColor}/>
          </FormControl>
          <Button
            mt={4}
            width="full"
            type="submit"
            bgGradient="radial(150.88% 889.9% at -47.06% 120.71%, #FF321B 10.19%, rgba(96, 103, 255, 0.98) 100%)"
            _hover={{
              bgGradient: "radial(150.88% 889.9% at -47.06% 120.71%, #FF321B 10.19%, rgba(96, 103, 255, 0.98) 90%)"
            }}
            color="white"
          >
            Sign Up
          </Button>
        </form>
      </VStack>
    </>
  );
};

export default SignupPage;
