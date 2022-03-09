import express from 'express';
import cors from 'cors';
import storyRoutes from './routes';

const app = express();

app.use(express.json());
app.use(cors());


app.use("/", storyRoutes);

const port = 3000;

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
})

