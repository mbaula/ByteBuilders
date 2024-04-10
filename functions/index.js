import app from './backend/express.js';
import * as functions from 'firebase-functions';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect(functions.config().mongodb.uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to the database!"))
.catch(err => console.error(`Failed to connect to database: ${err.message}`));

export const api = functions.https.onRequest(app);