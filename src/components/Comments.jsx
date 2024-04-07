import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Textarea,
  VStack,
  Text,
  Stack,
  HStack,
  Badge
} from '@chakra-ui/react';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Stub user and date for demonstration
    const commentToAdd = {
      id: comments.length + 1,
      text: newComment,
      user: "User" + (comments.length + 1), // Example user name
      date: new Date().toLocaleDateString(), // Current date
      postId
    };
    setComments([...comments, commentToAdd]);
    setNewComment('');
    // Here you would typically make an API call to persist the comment
  };

  return (
    <VStack spacing={8} align="stretch"> 
      <Divider my={5} /> 
      
      <Heading size="lg" mb={4}>Add a Comment</Heading> 
      <form onSubmit={handleCommentSubmit}>
        <FormControl>
          <FormLabel htmlFor="comment" fontSize="lg">Your Comment</FormLabel>
          <Textarea
            id="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment here..."
            size="lg" // Larger textarea
          />
        </FormControl>
        <Button type="submit" mt={4} colorScheme="blue" size="lg">Submit Comment</Button>
      </form>

      {comments.length > 0 && (
        <Box mt={2}>
          <Text fontWeight="bold" mb={2}>Comments</Text>
          <Stack spacing={3}>
            {comments.map(comment => (
              <Box key={comment.id} p={5} shadow="md" borderWidth="1px">
                <HStack justify="space-between">
                  <Text fontWeight="bold">{comment.user}</Text>
                  <Badge>{comment.date}</Badge>
                </HStack>
                <Text mt={2}>{comment.text}</Text>
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </VStack>
  );
};

export default Comments;
