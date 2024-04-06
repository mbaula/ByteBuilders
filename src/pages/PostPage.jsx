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
import Select, { components } from 'react-select';
import ReactQuill, { Quill } from 'react-quill';
import hljs from 'highlight.js';
import 'react-quill/dist/quill.snow.css';
import 'highlight.js/styles/github.css'; 
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'code-block'],
    ['clean']
  ],
  syntax: {
    highlight: text => hljs.highlightAuto(text).value
  },
};
const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'code-block'
];

const PostPage = () => {
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [body, setBody] = useState('');
  const toast = useToast();
  const { getUserIdFromToken } = useAuth();

  const customSelectStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: useColorModeValue('white', 'gray.700'),
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: useColorModeValue('white', 'gray.700'),
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isFocused ? useColorModeValue('gray.100', 'gray.600') : isSelected ? useColorModeValue('gray.300', 'gray.500') : undefined,
      color: useColorModeValue('gray.700', 'gray.100'),
    }),
  };

  const handleCategoryChange = (selectedOption) => {
    if (selectedOption.value === 'add_new') {
      setShowNewCategoryInput(true);
    } else {
      setShowNewCategoryInput(false);
      setSelectedCategory(selectedOption);
    }
  };

  const handleAddCategory = () => {
    if (newCategoryName && !categories.find(category => category.label.toLowerCase() === newCategoryName.toLowerCase())) {
      const newCategory = { value: `new_${newCategoryName.toLowerCase()}`, label: newCategoryName };
      setCategories(prevCategories => [...prevCategories, newCategory]);
      setSelectedCategory(newCategory);
      setNewCategoryName('');
      setShowNewCategoryInput(false);
    } else {
      toast({
        title: 'Error',
        description: 'This category already exists or the name is empty.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        const formattedCategories = data.map(cat => ({ value: cat._id, label: cat.name }));
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

  const options = [...categories, { value: 'add_new', label: 'Add New Category' }];

  return (
    <>
      <Navbar />
      <Container maxW="container.md" py={5}>
        <Heading mb={4}>Share your tech insights here!</Heading>
        <FormControl isRequired mb={3}>
          <FormLabel>Topic</FormLabel>
          <Input placeholder="Your topic title..." value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Category</FormLabel>
          <Select
            isSearchable
            value={selectedCategory}
            onChange={handleCategoryChange}
            options={options}
            styles={customSelectStyles}
          />
          {showNewCategoryInput && (
            <VStack mt={4}>
              <Input placeholder="New category name" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
              <Button onClick={handleAddCategory}>Add Category</Button>
            </VStack>
          )}
        </FormControl>
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
        <Button colorScheme="blue" onClick={() => {}}>Post Blog</Button>
      </Container>
    </>
  );
};

export default PostPage;
