import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme'; 
import Navbar from './components/Navbar'; 

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
    </ChakraProvider>
  );
}

export default App;
