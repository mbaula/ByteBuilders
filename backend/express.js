import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

<<<<<<< HEAD
import userRoutes from "./routes/userRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
=======
import userRoutes from './routes/userRoutes.js';
import blogPostRoutes from './routes/blogPostRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import authRoutes from './routes/authRoutes.js'
>>>>>>> 3c471dd50cab6857687b13f3345afd5b58485a4f

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "ByteBuilder Backend Running" });
});

<<<<<<< HEAD
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
=======
app.use('/api/users', userRoutes);
app.use('/api/blogposts', blogPostRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api', authRoutes);
>>>>>>> 3c471dd50cab6857687b13f3345afd5b58485a4f

export default app;
