import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

// Validate environment variables
const requiredEnvVars = {
    AZURE_OPENAI_ENDPOINT: process.env.AZURE_OPENAI_ENDPOINT,
    AZURE_OPENAI_API_KEY: process.env.AZURE_OPENAI_API_KEY,
    AZURE_OPENAI_API_VERSION: process.env.AZURE_OPENAI_API_VERSION,
    AZURE_OPENAI_DEPLOYMENT_NAME: process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
};

const missingVars = Object.entries(requiredEnvVars)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars.join(', '));
}

// Azure OpenAI Configuration
const endpoint = requiredEnvVars.AZURE_OPENAI_ENDPOINT?.endsWith('/') 
    ? requiredEnvVars.AZURE_OPENAI_ENDPOINT 
    : `${requiredEnvVars.AZURE_OPENAI_ENDPOINT}/`;

// Configure Azure OpenAI client
// Azure OpenAI structure: {endpoint}openai/deployments/{deployment}/images/generations?api-version={version}
// The baseURL should include the deployment path
const azureClient = new OpenAI({
    baseURL: `${endpoint}openai/deployments/${requiredEnvVars.AZURE_OPENAI_DEPLOYMENT_NAME}`,
    apiKey: requiredEnvVars.AZURE_OPENAI_API_KEY,
    defaultQuery: { 'api-version': requiredEnvVars.AZURE_OPENAI_API_VERSION },
});

router.route('/').get((req, res) => {
    res.send('Hello from DALL-E API!');
});

router.route('/').post(async (req, res) => {
    try {
        // Validate environment variables
        if (missingVars.length > 0) {
            return res.status(500).json({ 
                error: 'Server configuration error', 
                message: `Missing environment variables: ${missingVars.join(', ')}` 
            });
        }

        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        // Azure OpenAI Image Generation
        // With baseURL including deployment, just call generate without model parameter
        console.log('Azure Config:', {
            baseURL: `${endpoint}openai/deployments/${requiredEnvVars.AZURE_OPENAI_DEPLOYMENT_NAME}`,
            deployment: requiredEnvVars.AZURE_OPENAI_DEPLOYMENT_NAME,
            apiVersion: requiredEnvVars.AZURE_OPENAI_API_VERSION,
            fullUrl: `${endpoint}openai/deployments/${requiredEnvVars.AZURE_OPENAI_DEPLOYMENT_NAME}/images/generations?api-version=${requiredEnvVars.AZURE_OPENAI_API_VERSION}`
        });
        const response = await azureClient.images.generate({
            prompt: prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });

        const image = response.data[0].b64_json;
        res.status(200).json({ photo: image });
    } catch (error) {
        console.error('Azure OpenAI Error:', error);
        console.error('Error details:', {
            message: error?.message,
            status: error?.status,
            response: error?.response?.data,
        });
        res.status(500).json({ 
            error: 'Image generation failed', 
            message: error?.message || 'Something went wrong',
            details: error?.response?.data || null
        });
    }
})

export default router;