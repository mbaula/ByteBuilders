import React from 'react';
import Navbar from '../components/Navbar'; 
import {Avatar, Card, Container, CardHeader,CardFooter, Flex, Box, Heading, IconButton, CardBody, Text, Button} from '@chakra-ui/react';
import profileDefault from '../assets/anonymousprofile.png';

const myProfileDefault = profileDefault;

const Feed = () => {

    return (
      <>
        <Navbar />
        <Heading padding= "50px" align="center">Feed</Heading>
      <Box padding="15px 0px" align="center">
        <Card maxW="80%" p="6">
        <CardHeader align="left">
            <Flex spacing='4'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                <Avatar name='Segun Adebayo' src={myProfileDefault} />
                <Box>
                <Heading alignItems="flex-start" size='md'>Nnamdi Aduba</Heading>
                <Text>Artificial Intelligence</Text>
                <Text>20/01/2024</Text>
                </Box>
            </Flex>
            <IconButton
                variant='ghost'
                colorScheme='gray'
                aria-label='See menu'
            />
            </Flex>
         </CardHeader>
            <CardBody>
            <Heading align="left" fontSize="50px">Emerging Horizons: The Top Technology Trends Shaping 2024</Heading>
                <Text padding="20px 0px 0px 0px" align="left" fontSize="30px">The landscape of technology in 2024 is marked by a variety of groundbreaking innovations 
                set to reshape various facets of our lives. These developments stretch across different sectors, from artificial intelligence AI 
                and solar energy to healthcare and digital security, demonstrating the broad impact of technological advancements.</Text>
            </CardBody>
            <CardFooter justify='space-between' flexWrap='wrap' >
                <Box align="right" fontWeight="Bold">4 Comments</Box>
                <Button size="lg" variant="outline">Read More</Button>
            </CardFooter>
        </Card>
        </Box>
      </>
    );
  };
  
  export default Feed;