import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme'; 
import Navbar from './components/Navbar'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
