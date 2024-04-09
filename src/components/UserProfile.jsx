import React from 'react';
import Navbar from '../components/Navbar'; 
import {Avatar, Card, Container, CardHeader,CardFooter, Flex, Box, Heading, IconButton, CardBody, Text, Button} from '@chakra-ui/react';
import profileDefault from '../assets/anonymousprofile.png';

const myProfileDefault = profileDefault;

const UserProfile = () => {

    return (
      <>
      <Box padding="15px 0px" align="center">
        <Card maxW="80%" p="6">
            <CardBody>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar name='Segun Adebayo' src={myProfileDefault} />
            </Flex>
            <Text padding="20px 0px 0px 0px" align="left" fontSize="20px">Name: Nnamdi Aduba</Text>
            <Text padding="20px 0px 0px 0px" align="left" fontSize="20px">Username: Naduba</Text>
            <Text padding="20px 0px 0px 0px" align="left" fontSize="20px">Email: naduba@gmail.com</Text>
            <Text padding="20px 0px 0px 0px" align="left" fontSize="20px">Phone Number: 123 456 7890</Text>
            </CardBody>
        </Card>
        </Box>
      </>
    );
  };
  
  export default UserProfile;