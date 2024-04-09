import React from 'react';
import { Link } from 'react-router-dom';
import {Avatar, Card, Container, CardHeader,CardFooter, Flex, Box, Heading, IconButton, CardBody, Text, Button} from '@chakra-ui/react';
import profileDefault from '../assets/anonymousprofile.png';

const myProfileDefault = profileDefault;

const PostItem = ({id, title, content, username, categories, publishDate, comments}) => {
    const categoryList = categories.map(cat => cat.name).join(', ');
    const dateString = publishDate;
    const firstTenChars = dateString.slice(0, 10);

    const content2 = content.replace(/<[^>]+>/g, '');
    

    return (
      <>
      <Box padding="15px 0px" align="center">
        <Card maxW="80%" p="6">
        <CardHeader align="left">
            <Flex spacing='4'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                <Avatar src={myProfileDefault} />
                <Box>
                <Heading alignItems="flex-start" size='md'>{username}</Heading>
                <Text>{categoryList}</Text>
                <Text>{firstTenChars}</Text>
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
            <Heading align="left" fontSize="50px">{title}</Heading>
                <Text padding="20px 0px 0px 0px" align="left" fontSize="30px">{content2}</Text>
            </CardBody>
            <CardFooter display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
            <Text fontSize="sm">{comments.length} Comments</Text>
            <Link to={`/blog/${id}`}>
                <Button size="lg" variant="outline">Read More</Button>
            </Link>
            </CardFooter>
        </Card>
        </Box>
      </>
    );
  };
  
  export default PostItem;