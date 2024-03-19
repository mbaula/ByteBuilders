import express from 'express';

const router = express.Router();

router.get('/test', (req, res) => {
    res.send('Comment route is working');
});

export default router;
