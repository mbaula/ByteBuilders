import React from 'react';
import {
  Box,
  Button,
  FormControl,
  Input,
  VStack,
  useToast,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import bytebuilderlogo from '.././assets/bytebuilder-logo.png';
import Navbar from '../components/Navbar'; 

const SignupPage = () => {
  const toast = useToast();

  const formBackground = useColorModeValue('white', 'gray.700');
  const inputBackground = useColorModeValue('gray.100', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');
  const boxShadow = useColorModeValue('0px 4px 25px -2px rgba(0, 0, 0, 0.4)', '0px 4px 25px -2px rgba(255, 255, 255, 0.1)');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        phoneNumber: formData.get('phoneNumber'),
    };

    // Handle the data submission here, e.g., posting to your API
    console.log(data);

    toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 5000,
        isClosable: true,
    });
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
            height="80vh"
            maxWidth="100%" 
            maxHeight="100%"
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
