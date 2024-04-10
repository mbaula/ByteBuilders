import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import profileDefault from '../assets/anonymousprofile.png';

const PostItem = ({ id, title, content, username, categories, publishDate, comments }) => {
  const categoryList = categories.map(cat => cat.name).join(', ');
  const dateString = publishDate;
  const firstTenChars = dateString.slice(0, 10);
  const content2 = content.replace(/<[^>]+>/g, '');

  return (
    <Box padding="15px" align="center">
      <Card maxW={{ base: "90%", md: "80%" }} p={6}>
        <CardHeader align="left">
          <Flex justify="space-between">
            <Flex gap={4} align="center">
              <Avatar src={profileDefault} />
              <Box>
                <Heading size="md">{username}</Heading>
                <Text>{categoryList}</Text>
                <Text>{firstTenChars}</Text>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <Heading align="left" size={{ base: "md", md: "lg" }}>{title}</Heading>
          <Text mt={4} align="left">{content2}</Text>
        </CardBody>
        <CardFooter display="flex" justifyContent="space-between" alignItems="center">
          <Text fontSize="sm">{comments.length} Comments</Text>
          <Link to={`/blog/${id}`}>
            <Button variant="outline">Read More</Button>
          </Link>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default PostItem;
