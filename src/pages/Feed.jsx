import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; 
import {Heading} from '@chakra-ui/react';
import profileDefault from '../assets/anonymousprofile.png';
import PostItem from '../components/PostItem';


const myProfileDefault = profileDefault;

const Feed = () => {

  const [posts, setPosts] = useState([]);
  const apiBaseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiBaseUrl}/blogposts`)
      .then(response => response.json())
      .then(data => {
        const sortedData = data.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
        setPosts(sortedData);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []);
    return (
      <>
        <Navbar />
        <Heading padding= "50px" align="center">Feed</Heading>
        {posts.map((post, index) => (
             <PostItem key={post._id || index} id={post._id} title = {post.title} content={post.content} username={post.author?.username} publishDate={post.publishDate} categories={post.categories} comments={post.comments}/>
        ))}
      </>
    );
  };
  
  export default Feed;