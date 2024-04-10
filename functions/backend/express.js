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
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.json({ message: 'ByteBuilder Backend Running' });
});

app.use('/users', userRoutes);
app.use('/blogposts', blogPostRoutes);
app.use('/categories', categoryRoutes);
app.use('/comments', commentRoutes);
app.use('/', authRoutes);

export default app;