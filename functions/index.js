import app from './backend/express.js';
import * as functions from 'firebase-functions';

export const api = functions.https.onRequest(app);