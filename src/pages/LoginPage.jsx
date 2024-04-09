import React from 'react';
import {
  Box, Button, FormControl, Input, VStack, useToast, Heading, useColorModeValue, Text, Link as ChakraLink
} from '@chakra-ui/react';
import bytebuilderlogo from '.././assets/bytebuilder-logo.png';
import Navbar from '../components/Navbar';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const formBackground = useColorModeValue('white', 'gray.700');
  const inputBackground = useColorModeValue('gray.100', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');
  const boxShadow = useColorModeValue('0px 4px 25px -2px rgba(0, 0, 0, 0.4)', '0px 4px 25px -2px rgba(255, 255, 255, 0.1)');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    const data = { email, password };
    try {
      const response = await fetch('http://localhost:3000/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (response.ok) {
        login(json.token);

        toast({
          title: 'Login successful',
          description: "You're now logged in.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

<<<<<<< HEAD
        navigate('/feed');
=======
        navigate('/Feed');
>>>>>>> fac035a (Routing, and Feed Fix)
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
        pt={{ base: "60px", md: "80px" }}
      />
      <VStack
        mt={{ base: "200vh", md: "10vh" }} 
        spacing={8}
        align="stretch"
        justifyContent="center"
        bg={formBackground}
        p={{ base: 4, sm: 8 }}
        m="auto"
        borderRadius="20px"
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
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="email" isRequired mb={6}>
            <Input name="email" type="email" placeholder="Email Address" bg={inputBackground} color={textColor}/>
          </FormControl>
          <FormControl id="password" isRequired mb={6}>
            <Input name="password" type="password" placeholder="Password" bg={inputBackground} color={textColor}/>
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
            Login
          </Button>
          <Text mt={4} textAlign="center" fontSize={{ base: "16px"}}>
            Need an account?{" "}
            <ChakraLink as={RouterLink} to="/signup" color="teal.500" textDecoration="underline" fontSize={{ base: "16px"}}>
              SIGN UP
            </ChakraLink>
          </Text>
        </form>
      </VStack>
    </>
  );
};

export default LoginPage;
