import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'; 
import {Avatar, Card, Container, CardHeader,CardFooter, Flex, Box, Heading, IconButton, CardBody, Text, Button} from '@chakra-ui/react';
import profileDefault from '../assets/anonymousprofile.png';

const myProfileDefault = profileDefault;

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const apiBaseUrl = import.meta.env.VITE_API_URL;
    useEffect(() => {
      const fetchUserData = async () => {
        const token = localStorage.getItem('token'); 
        try {
          const response = await fetch(`${apiBaseUrl}/users/current_user`, { 
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const userData = await response.json();
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUserData();
    }, []);
  
    if (!user) {
      return <div>Loading...</div>; 
    }

    return (
      <>
      <Box padding="15px 0px" align="center">
        <Card maxW="80%" p="6">
            <CardBody>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar name={user.username} src={user.profilePicture || profileDefault} />
            </Flex>
            <Text padding="20px 0px 0px 0px" align="left" fontSize="20px">Name: {user.profile.fullName}</Text> 
            <Text padding="20px 0px 0px 0px" align="left" fontSize="20px">Username: {user.username}</Text>
            <Text padding="20px 0px 0px 0px" align="left" fontSize="20px">Email: {user.email}</Text>
            </CardBody>
        </Card>
        </Box>
      </>
    );
  };
  
  export default UserProfile;