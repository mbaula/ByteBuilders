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
  DrawerCloseButton
} from '@chakra-ui/react';
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isLoggedIn } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); 
  const hoverColor = "#3fbeff";

  const menuItemsLeft = ['Feed', 'Category'];
  if (isLoggedIn) {
    menuItemsLeft.push('Post');
  }
  const menuItemsRight = isLoggedIn ? ['Profile', 'Logout'] : ['Sign Up', 'Log In'];

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

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

      <Image src="..\src\assets\bytebuilder-logo.png" alt="ByteBuilder Logo" boxSize="75px" />

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

      {isLoggedIn && <Box mx="4" visibility="hidden">Placeholder</Box>}

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
                <Link key={index} py={2} href={`/${item.toLowerCase()}`} onClick={toggleDrawer}>
                  {item}
                </Link>
              ))}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Navbar;
