import React from 'react';
import Navbar from '../components/Navbar'; 
import {Avatar, Card, Container, CardHeader,CardFooter, Flex, Box, Heading, IconButton, CardBody, Text, Button} from '@chakra-ui/react';
import profileDefault from '../assets/anonymousprofile.png';
import PostItem from '../components/PostItem';

const myProfileDefault = profileDefault;

const Feed = () => {

    return (
      <>
        <Navbar />
        <Heading padding= "50px" align="center">Feed</Heading>
        <PostItem/>
        <PostItem/>
        <PostItem/>
        <PostItem/>
      </>
    );
  };
  
  export default Feed;