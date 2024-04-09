import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; 
import {Heading} from '@chakra-ui/react';
import profileDefault from '../assets/anonymousprofile.png';
import PostItem from '../components/PostItem';


const myProfileDefault = profileDefault;

const Feed = () => {

  const [posts, setPosts] = useState([]);

    useEffect(()=>{
      fetch('http://localhost:3000/api/blogposts')
      .then(response => response.json())
      .then(data=>{
        setPosts(data);
      })
      .catch(error=> console.error('Error fetching posts:', error));
    },[])
    return (
      <>
        <Navbar />
<<<<<<< HEAD
        <Heading padding= "50px" textAlign="center">Feed</Heading>
        <PostItem/>
        <PostItem/>
        <PostItem/>
        <PostItem/>
=======
        <Heading padding= "50px" align="center">Feed</Heading>
        {posts.map((post, index) => (
             <PostItem key={post._id || index} title = {post.title} content={post.content} username={post.author?.username} publishDate={post.publishDate} categories={post.categories}/>
        ))}
>>>>>>> fac035a (Routing, and Feed Fix)
      </>
    );
  };
  
  export default Feed;