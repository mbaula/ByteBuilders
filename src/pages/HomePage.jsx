import React from 'react';
import Navbar from '../components/Navbar'; 
import { Box, Button, Container, Heading, Text, Flex, Center } from '@chakra-ui/react';
import backgroundImage from '../assets/bytebuilders.png';
import backgroundImage2 from '../assets/bytebuilder-logocopy.png';
import profileDefault from '../assets/anonymousprofile.png';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

/** This is the HomePage*/

const bgByteBuilders = backgroundImage;
const bgByteBuildersBlue = backgroundImage2;

const HomePage = () => {
  
  const featureBubble1 ={
    fontFamily:"'Trebuchet MS', sans-serif",
    p: "10px",
    color: "rgba(255, 255, 255, 1)",
    m:"10px",
    textAlign: "justify",
    lineHeight:"1.2",
    padding: "100px",
    maxWidth: "900px",
    borderRadius: "60px",
    position: "relative", 
    overflow: "hidden",
    fontSize:"18px"
  }

  const boxBgImg={
      backgroundSize: "contain",
      backgroundPosition:"right",
      backgroundRepeat:"no-repeat",
      opacity: "0.1", 
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
    padding: "30px 40px",
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

      <Box bgImage={bgByteBuildersBlue} bgPosition="center" bgRepeat="no-repeat" bgSize="contain" position="absolute" top={0} left={0} right={0} bottom={0} opacity="0.1" zIndex={-1} />

      <Flex>

      <Container marginRight="0" lineHeight="shorter" fontSize="25px" w="50%" p={5} style={{ textAlign: 'left', marginTop: '20px' }} maxWidth="2xl">
        <Heading fontSize="70px" my="30px">Byte-Builders</Heading>

        <Text>Is the fresh, dynamic blogging spot for tech
           enthusiasts and coding wizards craving the latest in tech and software.
        </Text>

        <Text my="25px">
          A community-driven platform where sharing, learning, and discussing the newest tech trends 
          and tools happens daily. Join the wave, enhance your skills, and contribute 
          to the tech world's collective growth with ByteBuilder.
        </Text>

        <Box textAlign="left">
        <RouterLink to={"/signup"}>
          <Button sx={ourElegantButton} marginLeft="auto">Sign Up</Button>
        </RouterLink>

        </Box>

      </Container>
        
      <Container marginLeft="0" w="50%" p={5} >

        <Box backgroundImage={bgByteBuilders} height="525px"
          width="100%"
          backgroundSize="contain"
          backgroundPosition="center"
          backgroundRepeat="no-repeat">
        </Box>

      </Container>

      </Flex>

      <Heading padding="80px" fontWeight="Bold" textAlign="center">Featured Posts</Heading>
      
      <Box padding="0 150px">
      <Flex>
      <Container position="relative" p="5" overflow="hidden" sx={featureBubble1} bgGradient= "radial(150.88% 889.9% at -47.06% 120.71%, #00C9A7 10.19%, rgba(130, 88, 255, 0.98) 100%)">
      
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
    
    <Box backgroundImage={profileDefault} height="350px"
          width="80%"
          backgroundSize="contain"
          backgroundPosition="center"
          alignItems="center"
          textAlign="center"
          backgroundRepeat="no-repeat">
    </Box>
    </Flex>
      
      
      <Flex alignItems="flex-end">
          
      <Box backgroundImage={profileDefault} height="350px"
          width="80%"
          backgroundSize="contain"
          backgroundPosition="center"
          alignItems="center"
          textAlign="center"
          backgroundRepeat="no-repeat">
    </Box>

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
      </Flex>
      
      <Flex>
      <Container position="relative" p="4" overflow="hidden" sx={featureBubble1} bgGradient= "radial(150% 150% at 0% 0%, #2882DD 20%, #DB1169 80%, #D6A012 100%)">
      
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
    <Box backgroundImage={profileDefault} height="350px" 
          width="80%"
          backgroundSize="contain"
          backgroundPosition="center"
          alignItems="center"
          textAlign="center"
          backgroundRepeat="no-repeat">
    </Box>
    </Flex>
      
      </Box>
    </>
  );
};

export default HomePage;
