import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  VStack,
  Container,
  Button,
  useColorMode,
  Link as ChakraLink
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import gfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Comments from '../components/Comments';

const BlogPostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [authorName, setAuthorName] = useState('');
  const [categoryNames, setCategoryNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { colorMode } = useColorMode();
  const codeStyle = colorMode === 'dark' ? vscDarkPlus : vs;

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    const fetchAuthorName = async (authorId) => {
      try {
        const authorResponse = await fetch(`http://localhost:3000/api/users/${authorId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const authorData = await authorResponse.json();
        setAuthorName(authorData.username);
      } catch (error) {
        console.error("Failed to fetch author:", error);
        setAuthorName('Unknown Author');
      }
    };

    const fetchCategoryNames = async (categoryIds) => {
      const names = await Promise.all(categoryIds.map(async (categoryId) => {
        try {
          const categoryResponse = await fetch(`http://localhost:3000/api/categories/${categoryId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const categoryData = await categoryResponse.json();
          return categoryData.name;
        } catch (error) {
          console.error("Failed to fetch category:", error);
          return 'Unknown Category';
        }
      }));
      setCategoryNames(names);
    };

    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/blogposts/${postId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const postData = await response.json();
        await fetchAuthorName(postData.author);
        await fetchCategoryNames(postData.categories);
        setPost(postData);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch post details:", error);
        setIsLoading(false);
      }
    };

    if (token) {
      fetchPost();
    } else {
      setIsLoading(false);
    }
  }, [postId]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <Container centerContent>
          <Text>Loading...</Text>
        </Container>
      </>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <Container centerContent>
          <VStack mt={'25vh'} spacing={6} align="center" textAlign={'center'}>
            <Heading>To view the blog post, please sign up or log in.</Heading>
            <Link to="/signup"><Button colorScheme="blue">Sign Up</Button></Link>
            <Link to="/login"><Button colorScheme="teal">Log In</Button></Link>
          </VStack>
        </Container>
      </>
    );
  }

  const markdownComponents = {
    h1: ({node, ...props}) => <Heading as="h1" size="xl" {...props} />,
    h2: ({node, ...props}) => <Heading as="h2" size="lg" {...props} />,
    code({ node, inline, className, children, ...props }) {
      if (inline) {
        return (
          <Text as="span" fontFamily="mono" {...props}>
            {children}
          </Text>
        );
      }
    },
    blockquote: ({ node, ...props }) => (
      <Box as="blockquote" px={4} py={2} bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'} borderLeft="5px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.300'} {...props} />
    ),
    img: ({ node, ...props }) => (
      <Box as="img" my={4} {...props} style={{ maxWidth: '100%', height: 'auto' }} />
    ),
    a: ({ node, ...props }) => (
      <ChakraLink as={Link} to={props.href} style={{ fontSize: 'inherit' }} color="blue.500" isExternal textDecoration="underline" {...props} />
    ),
    pre({ node, children, ...props }) {
      return (
        <Box overflowX="auto" maxWidth="100%">
          <SyntaxHighlighter
            style={codeStyle}
            language="javascript"
            PreTag="div"
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </Box>
      );
    },
  };

  return (
    <>
      <Navbar />
      <Container maxW={{ base: "90%", md: "container.md" }} marginTop="5">
        <VStack spacing={5} align="start">
          <Heading size="2xl">{post?.title}</Heading>
          <Box>
            <Text fontSize={{ base: "md", md: "lg" }} color="gray.500">By {authorName}</Text>
            <Text fontSize={{ base: "sm", md: "md" }} color="gray.500">{categoryNames.join(', ')} - {new Date(post?.publishDate).toLocaleDateString()}</Text>
          </Box>
          <ReactMarkdown
            children={post?.content}
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[gfm]}
            components={markdownComponents}
          />
        </VStack>
        <Comments postId={postId} />
      </Container>
    </>
  );
};

export default BlogPostDetail;
