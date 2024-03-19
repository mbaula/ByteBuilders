import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'ByteBuilder Backend Running' });
});

app.use('/api/users', userRoutes);

export default app;