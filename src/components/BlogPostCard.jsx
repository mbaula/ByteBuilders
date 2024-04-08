import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const BlogPostCard = ({ post }) => {
  const navigate = useNavigate();

  const createExcerpt = (htmlContent, maxLength = 150) => {
    const strippedString = htmlContent.replace(/(<([^>]+)>)/gi, "");
    if (strippedString.length > maxLength) {
      return `${strippedString.substring(0, maxLength)}...`;
    } else {
      return strippedString;
    }
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" mb={4}>
      <Heading fontSize="xl">{post.title}</Heading>
      <Text mt={1} fontSize="xs" color="gray.500">{`By ${post.author.username} on ${new Date(post.publishDate).toLocaleDateString()}`}</Text>
      <Text mt={4}>{createExcerpt(post.content)}</Text>
      <Button mt={4} onClick={() => navigate(`/blog/${post._id}`)} colorScheme="teal">Read More</Button>
    </Box>
  );
};

export default BlogPostCard;
