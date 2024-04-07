import React, { useEffect, useState } from 'react';
import {
  Box, Button, Divider, FormControl, FormLabel, Heading, Textarea, VStack, Text, Stack, Flex, Badge, useToast, HStack,
} from '@chakra-ui/react';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const toast = useToast(); // Using toast for notifications

  useEffect(() => {
    const fetchComments = async () => {
      const userToken = localStorage.getItem('token');
      if (!userToken) {
        toast({
          title: 'Authentication error',
          description: 'User not logged in or token not available',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        return;
      }
      try {
        const response = await fetch(`http://localhost:3000/api/comments/byPost/${postId}`, {
          headers: { 'Authorization': `Bearer ${userToken}` },
        });
        if (!response.ok) throw new Error('Failed to fetch comments');
        const data = await response.json();
        setComments(data.sort((a, b) => new Date(b.commentDate) - new Date(a.commentDate)));
      } catch (error) {
        console.error('Failed to fetch comments:', error);
        toast({
          title: 'Error fetching comments',
          description: error.toString(),
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    };
    fetchComments();
  }, [postId, toast]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const userToken = localStorage.getItem('token');
    if (!userToken) {
      toast({
        title: 'Authentication error',
        description: 'User not logged in or token not available',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userToken}` },
        body: JSON.stringify({ content: newComment, post: postId }),
      });
      if (!response.ok) throw new Error('Failed to post comment');
      const newCommentData = await response.json();
      setComments(prevComments => [...prevComments, { ...newCommentData, isDeletable: true }]);
      setNewComment('');
    } catch (error) {
      console.error('Failed to post comment:', error);
      toast({
        title: 'Error posting comment',
        description: error.toString(),
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleDeleteComment = async (commentId) => {
    const userToken = localStorage.getItem('token');
    if (!userToken) {
      console.error('User not logged in or token not available');
      return;
    }

    const isConfirmed = window.confirm('Are you sure you want to delete this comment?');
    if (!isConfirmed) return;
    
    try {
      const response = await fetch(`http://localhost:3000/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${userToken}` },
      });
      if (!response.ok) throw new Error('Failed to delete comment');
      setComments(currentComments => currentComments.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error('Failed to delete comment:', error);
      toast({
        title: 'Error deleting comment',
        description: error.toString(),
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={8} align="stretch">
      <Divider my={5} />
      <Heading size="lg" mb={4}>Add a Comment</Heading>
      <form onSubmit={handleCommentSubmit}>
        <FormControl>
          <FormLabel htmlFor="comment" fontSize="lg">Your Comment</FormLabel>
          <Textarea id="comment" value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Write your comment here..." size="lg" />
        </FormControl>
        <Button type="submit" mt={4} colorScheme="blue" size="lg">Submit Comment</Button>
      </form>
      {comments.length > 0 && (
        <Box mt={8}>
          <Text fontWeight="bold" mb={2}>Comments</Text>
          <Stack spacing={3}>
            {comments.map(comment => (
              <Box key={comment._id} p={5} shadow="md" borderWidth="1px">
                <Flex direction={{ base: 'column', sm: 'row' }} justify="space-between" align="flex-start">
                  <HStack spacing={4}>
                    <Text fontWeight="bold">{comment.author ? comment.author.username : "Anonymous"}</Text>
                    {comment.isDeletable && (
                      <Button colorScheme="red" size="xs" onClick={() => handleDeleteComment(comment._id)}>Delete</Button>
                    )}
                  </HStack>
                  <Badge alignSelf={{ base: 'flex-start', sm: 'center' }}>{new Date(comment.commentDate).toLocaleDateString()}</Badge>
                </Flex>
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
