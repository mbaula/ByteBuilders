import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage.jsx';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage.jsx';
import Feed from './pages/Feed.jsx';
import PostPage from './pages/PostPage.jsx';
import BlogPostDetail from './pages/BlogPostDetail.jsx';
import EditPostPage from './pages/EditPostPage.jsx';
import CategoriesPage from './pages/CategoriesPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

function App() {
  return (
    
    <ChakraProvider theme={theme}>
      <AuthProvider>
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage /> } />
        <Route path="/profile" element={<ProfilePage /> } />
        <Route path="/feed" element={<Feed /> } />
        <Route path='/post' element={<PostPage />} />
        <Route path="/blog/:postId" element={<BlogPostDetail />} />
        <Route path="/editPost/:postId" element={<EditPostPage />} />
        <Route path="/category" element={<CategoriesPage />} />
      </Routes>
      </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
