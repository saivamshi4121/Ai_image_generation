import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb'}));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
    res.send('Hello from AI Image Generation API!');
})

const startServer = async () => {
    try {
        if (!process.env.MONGODB_URL) {
            console.error('MONGODB_URL environment variable is not set');
            process.exit(1);
        }
        await connectDB(process.env.MONGODB_URL);
        const port = process.env.PORT || 8080;
        app.listen(port, () => console.log(`Server has started on port ${port}`))
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();