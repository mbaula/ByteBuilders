import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Button, Container, FormControl, FormLabel, Heading, Input, useToast, VStack, useColorModeValue, Textarea
} from '@chakra-ui/react';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Navbar from '../components/Navbar';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered'}, { list: 'bullet'}, { indent: '-1'}, { indent: '+1' }],
    ['link', 'image', 'code-block'],
    ['clean']
  ],
  syntax: {
    highlight: text => hljs.highlightAuto(text).value,
  },
};

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'code-block'
];

const EditPostPage = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [body, setBody] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/categories`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data.map(cat => ({ value: cat._id, label: cat.name })));
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Could not fetch categories',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    };

    const fetchPostData = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/blogposts/${postId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch post');
        const postData = await response.json();
        setTitle(postData.title);
        setBody(postData.content);
        const postCategory = postData.categories[0]; 
        setSelectedCategory(categories.find(cat => cat.value === postCategory));
      } catch (error) {
        toast({
          title: 'Error loading post',
          description: error.toString(),
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    };

    fetchCategories().then(fetchPostData);
  }, [postId, toast]);

  const handleCategoryChange = selectedOption => {
    setSelectedCategory(selectedOption);
  };

  const handleUpdatePost = async () => {
    if (!selectedCategory) {
        toast({
            title: 'Error',
            description: 'Please select a category for the blog post.',
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
        return;
    }
    const token = localStorage.getItem('token');
    const categoryId = selectedCategory.value;

    try {
      const blogData = {
        title,
        content: body,
        categories: [categoryId],
      };

      const response = await fetch(`${apiBaseUrl}/blogposts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to edit blog');
      }

      navigate(`/blog/${postId}`);
    } catch (error) {
      console.error("Error:", error);
      toast({
          title: 'Error',
          description: `Unable to edit blog: ${error.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
      });
    }
  };
  
  const customSelectStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { isDisabled }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? 'gray' : 'white',
        color: 'black',
      };
    },
  };

  const sortedOptions = categories.sort((a, b) => a.label.localeCompare(b.label));

  return (
    <>
      <Navbar />
      <Container maxW="container.md" py={5}>
        <Heading mb={4}>Edit Your Post</Heading>
        <FormControl isRequired mb={3}>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Post title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Category</FormLabel>
          <Select
            isSearchable
            value={selectedCategory}
            onChange={handleCategoryChange}
            options={sortedOptions}
            styles={customSelectStyles}
          />
        </FormControl>
        <FormControl isRequired mb={3}>
          <FormLabel>Body</FormLabel>
          <ReactQuill
            theme="snow"
            value={body}
            onChange={setBody}
            modules={modules}
            formats={formats}
          />
        </FormControl>
        <Button
          mt={4}
          colorScheme="blue"
          onClick={handleUpdatePost}
        >
          Update Post
        </Button>
      </Container>
    </>
  );
};

export default EditPostPage;
