import React, { useState, useEffect } from 'react';
import { Container, Box, Heading, Text, Link as ChakraLink, useToast } from '@chakra-ui/react';
import Select from 'react-select';
import Navbar from '../components/Navbar';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchCategories = async () => {
        try {
          const token = localStorage.getItem('token');
          
          if (!token) {
            throw new Error('Authentication token not found');
          }
      
          const response = await fetch('http://localhost:3000/api/categories', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
      
          if (!response.ok) throw new Error('Failed to fetch categories');
          const data = await response.json();
          setCategories(data.map(cat => ({ value: cat._id, label: cat.name })));
        } catch (error) {
          toast({
            title: 'Error',
            description: error.message || 'Could not fetch categories',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
    };      
    fetchCategories();
  }, [toast]);

  const handleCategoryChange = async (selectedOption) => {
    setSelectedCategory(selectedOption);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast({
          title: 'Error',
          description: 'Authentication token not found',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        return;
      }
      
      const response = await fetch(`http://localhost:3000/api/blogposts/category/${selectedOption.value}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) throw new Error('Failed to fetch blog posts for category');
      const posts = await response.json();
      setBlogPosts(posts);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not fetch blog posts for the selected category',
        status: 'error',
        duration: 9000,
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
    menuPortal: base => ({ ...base, zIndex: 9999 }),
  };

  return (
    <>
      <Navbar />
      <Container maxW="container.md" py={5}>
        <Heading mb={4}>Select a Category</Heading>
        <Box mb={4}>
          <Select
            isSearchable
            value={selectedCategory}
            onChange={handleCategoryChange}
            options={categories}
            styles={customSelectStyles}
            menuPortalTarget={document.body}
          />
        </Box>
        <Box>
          {blogPosts.map(post => (
            <Box key={post._id} p={5} shadow="md" borderWidth="1px" mb={4}>
              <Heading fontSize="xl">{post.title}</Heading>
              <Text mt={2}>{post.content.substring(0, 200)}...</Text>
              <ChakraLink href={`/blog/${post._id}`} color="teal.500">Read more</ChakraLink>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default CategoriesPage;
