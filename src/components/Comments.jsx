import React, { useEffect, useState } from 'react';
import {
  Box, Button, Divider, FormControl, FormLabel, Heading, Textarea, VStack, Text, Stack, Flex, Badge, useToast, HStack,
} from '@chakra-ui/react';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const toast = useToast(); 
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');

  const handleStartEdit = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditingContent(content);
  };

  const apiBaseUrl = import.meta.env.VITE_API_URL;

  const handleSubmitEdit = async (e, commentId) => {
    e.preventDefault();
    const userToken = localStorage.getItem('token');
  
    try {
      const response = await fetch(`${apiBaseUrl}/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({ content: editingContent }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update comment');
      }
  
      const updatedComment = await response.json();
      setComments(comments.map((comment) => (comment._id === commentId ? { ...comment, content: updatedComment.content } : comment)));
      
      setEditingCommentId(null);
      setEditingContent('');
    } catch (error) {
      console.error('Failed to update comment:', error);
    }
  };  

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingContent('');
  };

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
        const response = await fetch(`${apiBaseUrl}/comments/byPost/${postId}`, {
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
      const response = await fetch(`${apiBaseUrl}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userToken}` },
        body: JSON.stringify({ content: newComment, post: postId }),
      });
      if (!response.ok) throw new Error('Failed to post comment');
        const newCommentData = await response.json();
        setComments(prevComments => [{ ...newCommentData, isDeletable: true, isEditable: true }, ...prevComments]);
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
      const response = await fetch(`${apiBaseUrl}/comments/${commentId}`, {
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
        <Button type="submit" mt={4} colorScheme="blue" size="md">Submit Comment</Button>
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
                    {comment.isEdited && <Text fontSize="sm" color="gray.600" ml={2}>(Edited)</Text>}
                    {comment.isEditable && (
                      <Button size="xs" onClick={() => handleStartEdit(comment._id, comment.content)}>Edit</Button>
                    )}
                    {comment.isDeletable && (
                      <Button colorScheme="red" size="xs" onClick={() => handleDeleteComment(comment._id)}>Delete</Button>
                    )}
                  </HStack>
                  <Badge alignSelf={{ base: 'flex-start', sm: 'center' }}>{new Date(comment.commentDate).toLocaleDateString()}</Badge>
                </Flex>
                {editingCommentId === comment._id ? (
                  <form onSubmit={(e) => handleSubmitEdit(e, comment._id)}>
                    <Textarea value={editingContent} onChange={(e) => setEditingContent(e.target.value)} size="sm" />
                    <Button type="submit" colorScheme="blue" size="xs">Save</Button>
                    <Button onClick={handleCancelEdit} size="xs" ml={2}>Cancel</Button>
                  </form>
                ) : (
                  <Text mt={2}>{comment.content}</Text>
                )}
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </VStack>
  );
};

export default Comments;
