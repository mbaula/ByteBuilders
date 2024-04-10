import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';
import Select from 'react-select';
import { components } from 'react-select';
import ReactQuill from 'react-quill';
import hljs from 'highlight.js';
import 'react-quill/dist/quill.snow.css';
import 'highlight.js/styles/github.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'code-block'],
    ['clean'],
  ],
  syntax: {
    highlight: text => hljs.highlightAuto(text).value,
  },
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'code-block',
];

const PostPage = () => {
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [body, setBody] = useState('');
  const toast = useToast();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_URL;

  const customSelectStyles = {
    control: styles => ({
      ...styles,
      backgroundColor: useColorModeValue('white', 'gray.700'),
    }),
    menu: styles => ({
      ...styles,
      backgroundColor: useColorModeValue('white', 'gray.700'),
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isFocused ? useColorModeValue('gray.100', 'gray.600') : isSelected ? useColorModeValue('gray.300', 'gray.500') : undefined,
      color: useColorModeValue('gray.700', 'gray.100'),
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: '132px', 
    }),
    menuPortal: base => ({ ...base, zIndex: 9999 }),
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/categories`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.map(cat => ({ value: cat._id, label: cat.name })));
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Could not fetch categories',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = selectedOption => {
    setSelectedCategory(selectedOption);
    setShowNewCategoryInput(selectedOption?.value === 'add_new');
  };

  const handleMenuOpen = () => {
    setIsDropdownOpen(true);
  };
  
  const handleMenuClose = () => {
    setIsDropdownOpen(false);
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast({
        title: 'Error',
        description: 'Category name cannot be empty.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      const response = await fetch(`${apiBaseUrl}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name: newCategoryName }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create new category');
      }
      const newCategoryData = await response.json();
      setCategories(prev => [...prev, { value: newCategoryData._id, label: newCategoryName }]);
      setSelectedCategory({ value: newCategoryData._id, label: newCategoryName });
      setShowNewCategoryInput(false);
      setNewCategoryName('');
    } catch (error) {
      toast({
        title: 'Error',
        description: `Unable to add new category: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const postBlog = async () => {
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
    const categoryId = selectedCategory.value;

    try {
      const blogData = {
        title,
        content: body,
        categories: [categoryId],
      };

      const response = await fetch(`${apiBaseUrl}/blogposts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to post blog');
      }

      const newPost = await response.json();
      navigate(`/blog/${newPost._id}`);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: 'Error',
        description: `Unable to post blog: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const options = categories.concat({ value: 'add_new', label: 'Add New Category' });
  const sortedOptions = [...options].sort((a, b) => a.label.localeCompare(b.label));

  const CustomOption = (props) => {
    if (props.data.value === 'add_new') {
      return (
        <components.Option {...props} className="custom-add-new-option">
          <Box color="blue.500" fontWeight="bold">
            {props.data.label}
          </Box>
        </components.Option>
      );
    }
  
    return <components.Option {...props} />;
  };

  return (
    <>
      <Navbar />
      <Container maxW="container.md" py={5}>
        <Heading mb={4}>Share your tech insights here!</Heading>
        <FormControl isRequired mb={3}>
          <FormLabel>Topic</FormLabel>
          <Input placeholder="Your topic title..." value={title} onChange={e => setTitle(e.target.value)} />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Category</FormLabel>
          <Select
            isSearchable
            value={selectedCategory}
            onChange={handleCategoryChange}
            options={sortedOptions}
            styles={customSelectStyles}
            menuPortalTarget={document.body}
            onMenuOpen={handleMenuOpen}
            onMenuClose={handleMenuClose}
            components={{ Option: CustomOption }}
          />
          {showNewCategoryInput && (
            <VStack mt={4}>
              <Input placeholder="New category name" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} />
              <Button onClick={handleAddCategory}>Add Category</Button>
            </VStack>
          )}
        </FormControl>
        <Box mt={isDropdownOpen ? '10rem' : '0'}>
        <FormControl isRequired mb={3}>
          <FormLabel>Article Body</FormLabel>
          <ReactQuill
            theme="snow"
            value={body}
            onChange={setBody}
            modules={modules}
            formats={formats}
          />
        </FormControl>
        <Button colorScheme="blue" onClick={postBlog}>Post Blog</Button>
        </Box>
      </Container>
    </>
  );
};

export default PostPage;
