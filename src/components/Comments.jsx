import React, { useEffect, useState } from 'react';
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
  Badge,
} from '@chakra-ui/react';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const userToken = localStorage.getItem('token');
        if (!userToken) {
          console.error('User not logged in or token not available');
          return;
        }

        const response = await fetch(`http://localhost:3000/api/comments/byPost/${postId}`, {
          headers: {
            'Authorization': `Bearer ${userToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }

        let data = await response.json();
        data = data.sort((a, b) => new Date(b.commentDate) - new Date(a.commentDate));
        setComments(data);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const userToken = localStorage.getItem('token');
    if (!userToken) {
      console.error('User not logged in or token not available');
      return;
    }
  
    const commentData = {
      content: newComment,
      post: postId,
    };
  
    try {
      const response = await fetch('http://localhost:3000/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify(commentData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to post comment');
      }
  
      const newCommentData = await response.json();
      console.log(newCommentData);
      setComments((prevComments) => [...prevComments, newCommentData]);
      setNewComment(''); 
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
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
            size="lg"
          />
        </FormControl>
        <Button type="submit" mt={4} colorScheme="blue" size="lg">Submit Comment</Button>
      </form>
      {comments?.length > 0 && (
        <Box mt={2}>
          <Text fontWeight="bold">Comments</Text>
          <Stack spacing={3}>
            {comments.map((comment) => (
              <Box key={comment._id} p={5} shadow="md" borderWidth="1px">
                <HStack justify="space-between">
                  <Text fontWeight="bold">{comment.author ? comment.author.username : "Anonymous"}</Text>
                  <Badge>{new Date(comment.commentDate).toLocaleDateString()}</Badge>
                </HStack>
                <Text mt={2}>{comment.content}</Text>
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </VStack>
  );
};

export default Comments;
