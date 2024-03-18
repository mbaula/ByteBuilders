import app from './express.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to the database!"))
.catch(err => console.error(`Failed to connect to database: ${err.message}`));

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.info(`Server is running on port ${PORT}`);
});