import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage.jsx';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    
    <ChakraProvider theme={theme}>
      <AuthProvider>
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
      </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
