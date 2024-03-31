import React from 'react';
import Navbar from '../components/Navbar'; 
import { Box, Button, Container, Heading, Text } from '@chakra-ui/react';
import backgroundImage from '../assets/bytebuilders.png';


const bgByteBuilders = backgroundImage;

const HomePage = () => {
  
  const featureBubble1 ={
    p: "10px",
    color: "rgba(255, 255, 255, 1)",
    m:"10px",
    textAlign: "justify",
    lineHeight:"shorter",
    padding: "20px 50px 20px 50px",
    maxWidth: "700px",
    borderRadius: "35px",
    position: "relative", // Needed to position the background image absolutely
    overflow: "hidden"
/*we can also use things like
filter: 'blur(2px)',
':hover':{
  color: 'black',
  bg: 'blue.200'
}
    * 
 */
  }

  const boxBgImg={
      
      backgroundSize: "cover",
      backgroundPosition:"right",
      backgroundRepeat:"no-repeat",
      opacity: "0.1", // Adjust for desired opacity
      position: "absolute",
      right: "0",
      top: "0",
      bottom : "0",
      width : "40%"
  }

  const ourElegantButton ={
    color: "white",
    bg: "black",
    fontSize: "15px",
    padding: "25px",
    boxShadow: "md",
    borderRadius: "5px",
    ':hover':{
      color: "black",
      bg: "off-white",
    }
  }

  return (
    <>
      <Navbar />

      <Container style={{ textAlign: 'left', marginTop: '20px' }} maxWidth="2xl" >

        <Heading my="50px">Byte-Builders</Heading>

        <Text>is the fresh, dynamic blogging spot for tech
           enthusiasts and coding wizards craving the latest in tech and software.
        </Text>

        <Text my="25px">
          A community-driven platform where sharing, learning, and discussing the newest tech trends 
          and tools happens daily. Join the wave, enhance your skills, and contribute 
          to the tech world's collective growth with ByteBuilder.
        </Text>

        <Box textAlign="left">
          <Button sx={ourElegantButton} marginLeft="auto">Sign Up</Button>
        </Box>

      </Container>

      <Heading fontWeight="Bold" textAlign="center">Featured</Heading>

      <Container position="relative" p="4" overflow="hidden" sx={featureBubble1} bgGradient= "radial(150.88% 889.9% at -47.06% 120.71%, #00C9A7 10.19%, rgba(130, 88, 255, 0.98) 100%)">
      
        <Box backgroundImage= {bgByteBuilders} sx={boxBgImg}></Box>

        <Box padding="20px 0px" fontWeight="Bold" fontSize="40px" fontStyle="italic" >Alexis</Box>

        <Box>Did you know that the first computer virus was created in 1983 and called the 
          "Elk Cloner"? It was developed by a high school student and targeted Apple II 
          systems, displaying a short poem when it infected a computer. This piece of tech 
          history highlights the early days of cybersecurity challenges and the unexpected 
          origins of complex computer issues.
        </Box>

        <Box textAlign="right">
          <Button sx={ourElegantButton} marginLeft="auto">Explore</Button>
        </Box>
        
      </Container>


      <Container sx={featureBubble1} bgGradient= "radial(150.88% 889.9% at -47.06% 120.71%, #957DAD 10.19%, rgba(255, 107, 107, 0.98) 100%)">
      
        <Box backgroundImage= {bgByteBuilders} sx={boxBgImg}></Box>
        
        <Box padding="20px 0px" fontWeight="Bold" fontStyle="italic" fontSize="40px">Tony</Box>
        
        <Box>Imagine an AI that not only suggests code but also crafts and deploys entire 
          software projects independently – welcome to the era of Devin. Developed by 
          Cognition,
         this pioneering AI software engineer automates the full spectrum of development 
         tasks, from inception to live deployment.
        </Box>

        <Box textAlign="right">
          <Button sx={ourElegantButton} marginLeft="auto">Explore</Button>
        </Box>
          
       
      </Container>
    </>
  );
};

/**
 * <Box my="30px" p="20px" bg="orange">
 * <Text color="white">This is a box</Text>
 * </Box>
 * 
 * 
 * 
 */

export default HomePage;
