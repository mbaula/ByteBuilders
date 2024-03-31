import React, { useState } from 'react';
import {
  Box,
  Flex,
  Spacer,
  Link,
  useColorMode,
  useColorModeValue,
  IconButton,
  Image,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useToast
} from '@chakra-ui/react';
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useAuth } from '../context/AuthContext';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isLoggedIn, logout } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); 
  const hoverColor = "#3fbeff";
  const toast = useToast();
  const navigate = useNavigate();

  const menuItemsLeft = ['Feed', 'Category'];
  if (isLoggedIn) {
    menuItemsLeft.push('Post');
  }
  const menuItemsRight = isLoggedIn ? ['Profile'] : ['Sign Up', 'Log In'];

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have successfully logged out.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top", 
    });
    navigate('/');
  };

  return (
    <Flex
      px={6}
      py={4}
      align="center"
      justify="space-between"
      bg={useColorModeValue('gray.100', 'gray.900')}
      color={useColorModeValue('gray.900', 'gray.100')}
      wrap="wrap"
      mb={4}
    >
      {menuItemsLeft.map((item, index) => (
        <Box key={index} mx={100} display={{ base: "none", md: "block" }} >
          <Link
            href={`/${item.toLowerCase()}`}
            _hover={{ textDecoration: 'none', color: hoverColor }}
          >
            {item}
          </Link>
        </Box>
      ))}

      <Spacer />
      
      <RouterLink to={"/"}>
        <Image src="..\src\assets\bytebuilder-logo.png" alt="ByteBuilder Logo" width="100%" boxSize="75px" style={{ cursor: 'pointer' }} _hover={{ textDecoration: 'none' }}/>
      </RouterLink>

      <Spacer />

      {menuItemsRight.map((item, index) => (
        <Box key={index} mx={100} display={{ base: "none", md: "block" }}>
          <Link
            href={`/${item.replace(' ', '').toLowerCase()}`}
            _hover={{ textDecoration: 'none', color: hoverColor }}
          >
            {item}
          </Link>
        </Box>
      ))}

      {isLoggedIn && (
        <Link mx={100} display={{ base: "none", md: "block" }} onClick={handleLogout} style={{ cursor: 'pointer' }} _hover={{ textDecoration: 'none', color: hoverColor }}>
          Logout
        </Link>
      )}

      <IconButton
        ml={3}
        aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
        variant="ghost"
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
      />

      <IconButton
        ml={3}
        display={{ base: "inline-flex", md: "none" }}
        icon={<HamburgerIcon />}
        aria-label="Open menu"
        variant="ghost"
        onClick={toggleDrawer}
      />

      {}
      <Drawer isOpen={isDrawerOpen} placement="right" onClose={toggleDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <Flex direction="column" align="center">
              {menuItemsLeft.concat(menuItemsRight).map((item, index) => (
                <RouterLink key={index} to={`/${item.replace(/\s+/g, '').toLowerCase()}`} onClick={toggleDrawer} style={{ padding: "1rem", textDecoration: "none" }}>
                {item}
                </RouterLink>
              ))}
              {isLoggedIn && (
                <Link onClick={handleLogout} style={{ padding: "1rem", textDecoration: "none", fontSize: "16px"}}> 
                  Logout
                </Link>
              )}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Navbar;
