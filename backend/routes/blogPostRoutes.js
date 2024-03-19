import express from 'express';

const router = express.Router();

router.get('/test', (req, res) => {
    res.send('BlogPost route is working');
});

export default router;
