import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'; 
import * as functions from 'firebase-functions'

import userRoutes from './routes/userRoutes.js';
import blogPostRoutes from './routes/blogPostRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import authRoutes from './routes/authRoutes.js'

const app = express();
app.use(bodyParser.json());
const corsOptions = {
    origin: ['https://bytebuilder.web.app', 'http://localhost:3000', 'http://localhost:5173'], 
    optionsSuccessStatus: 200,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true, 
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.get('/', (req, res) => {
    res.json({ message: 'ByteBuilder Backend Running' });
});
app.use('/api/users', userRoutes);
app.use('/api/blogposts', blogPostRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api', authRoutes);

export default app;