import React from 'react';
import Navbar from '../components/Navbar'; 
import {Avatar, Card, Container, CardHeader,CardFooter, Flex, Box, Heading, IconButton, CardBody, Text, Button} from '@chakra-ui/react';
import UserProfile from '../components/UserProfile';

const ProfilePage = () => {

    return (
      <>
        <Navbar />
        <Heading padding= "50px" textAlign="center">Profile</Heading>
        <UserProfile/>
      </>
    );
  };
  
  export default ProfilePage;