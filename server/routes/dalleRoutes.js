import express from 'express';
import * as dotenv from 'dotenv';
import { AzureOpenAI } from 'openai';

dotenv.config();

const router = express.Router();

// Azure OpenAI Configuration
const azureClient = new AzureOpenAI({
    endpoint: process.env.AZURE_OPENAI_ENDPOINT,
    apiKey: process.env.AZURE_OPENAI_API_KEY,
    apiVersion: process.env.AZURE_OPENAI_API_VERSION || '2024-02-15-preview',
    deployment: process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
});

router.route('/').get((req, res) => {
    res.send('Hello from DALL-E API!');
});

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        // Azure OpenAI Image Generation
        const response = await azureClient.images.generate({
            model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
            prompt: prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });

        const image = response.data[0].b64_json;
        res.status(200).json({ photo: image });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send(error?.message || 'Something went wrong');
    }
})

export default router;