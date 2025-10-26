# Setup Guide for AI Image Generation Project

This guide will help you set up the project with your own credentials.

## Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** account (MongoDB Atlas - free tier available)
3. **Azure OpenAI** service account (from Azure Portal)
4. **Cloudinary** account (free tier available)

## Step 1: Get Your API Keys

### 1. Azure OpenAI Service
1. Create an Azure account (https://azure.microsoft.com/)
2. Go to Azure Portal
3. Create a new "Azure OpenAI" resource
4. Get your:
   - Endpoint URL
   - API Key
   - API Version (e.g., 2024-02-15-preview)
   - Deployment Name (create a DALLE deployment)

### 2. MongoDB Atlas
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string (e.g., `mongodb+srv://username:password@cluster.mongodb.net/`)

### 3. Cloudinary
1. Go to https://cloudinary.com/
2. Sign up for a free account
3. Go to Dashboard
4. Copy your:
   - Cloud name
   - API Key
   - API Secret

## Step 2: Configure Server

1. Navigate to the server directory:
```bash
cd server
```

2. Create a `.env` file:
```bash
# Windows PowerShell
New-Item .env

# Windows CMD or Mac/Linux
touch .env
```

3. Add your credentials to the `server/.env` file:
```env
MONGODB_URL=your_mongodb_connection_string_here
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your_azure_openai_api_key_here
AZURE_OPENAI_API_VERSION=2024-02-15-preview
AZURE_OPENAI_DEPLOYMENT_NAME=your_deployment_name
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. Install server dependencies:
```bash
npm install
```

## Step 3: Configure Client

1. Navigate to the client directory:
```bash
cd client
```

2. Create a `.env` file:
```bash
# Windows PowerShell
New-Item .env

# Windows CMD or Mac/Linux
touch .env
```

3. Add your configuration to the `client/.env` file:
```env
# For local development
VITE_API_BASE_URL=http://localhost:8080

# For production (update this when you deploy)
# VITE_API_BASE_URL=https://your-deployed-server.com
```

4. Install client dependencies:
```bash
npm install
```

## Step 4: Update API URLs in Code

Update the following files to use your API base URL:

### client/src/pages/Home.jsx
Replace the hardcoded URL with your environment variable.

### client/src/pages/CreatePost.jsx
Replace the hardcoded URLs with your environment variables.

## Step 5: Run the Application

### Terminal 1 - Start the Server
```bash
cd server
npm start
```

### Terminal 2 - Start the Client
```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173`

## Deployment

### Deploy Server
You can deploy your server to:
- Render.com (free tier available)
- Heroku
- Railway
- Vercel (for serverless)

After deploying, update `VITE_API_BASE_URL` in your client `.env` file.

### Deploy Client
You can deploy your client to:
- Vercel
- Netlify
- GitHub Pages

## Troubleshooting

- **MongoDB Connection Error**: Make sure your IP address is whitelisted in MongoDB Atlas
- **OpenAI API Error**: Verify your API key is correct and you have credits
- **Cloudinary Error**: Check your cloud name, API key, and API secret
- **CORS Errors**: Make sure your client URL is allowed in your CORS settings

## Security Notes

- Never commit `.env` files to version control
- Keep your API keys secret
- Rotate your keys if compromised
- Use environment-specific variables for production
