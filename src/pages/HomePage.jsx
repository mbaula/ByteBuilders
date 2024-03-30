import React from 'react';
import Navbar from '../components/Navbar'; 

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1>Welcome to Byte Builders</h1>
      </div>
    </>
  );
};

export default HomePage;
