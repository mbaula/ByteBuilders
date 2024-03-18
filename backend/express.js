import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import userRoutes from './routes/userRoutes.js';
import blogPostRoutes from './routes/blogPostRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'ByteBuilder Backend Running' });
});

app.use('/api/users', userRoutes);
app.use('/api/posts', blogPostRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/categories', categoryRoutes);

export default app;