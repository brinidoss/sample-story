import * as functions from "firebase-functions";
import express from 'express';
import cors from 'cors';
import storyRoutes from './routes';

const app = express();

app.use(express.json());
app.use(cors());


app.use("/", storyRoutes);

export const api = functions.https.onRequest(app);
