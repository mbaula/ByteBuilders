const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_SECRET_KEY",
    mongoUri: process.env.NODE_ENV === 'test' ? process.env.MONGODB_URI_TEST : 
                process.env.MONGODB_URI ||
                'mongodb://localhost:27017/bytebuilder'
};
  
export default config;
  