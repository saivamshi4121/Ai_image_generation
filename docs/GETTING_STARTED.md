# Getting Started

Follow these steps to set up your AI Image Generation project with your own credentials.

## Step 1: Get Your API Keys

### Azure OpenAI API
1. Create an Azure account (https://azure.microsoft.com/)
2. Go to Azure Portal
3. Create a new "Azure OpenAI" resource
4. Get your:
   - Endpoint URL
   - API Key
   - Create a deployment for DALLE
   - Copy deployment name

### MongoDB Connection
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user
5. Whitelist your IP address (or use 0.0.0.0/0 for all IPs during development)
6. Click "Connect" → "Connect your application"
7. Copy the connection string

### Cloudinary Account
1. Go to https://cloudinary.com/
2. Sign up for free account
3. Go to Dashboard
4. Copy:
   - Cloud name
   - API Key
   - API Secret

## Step 2: Configure Server

1. Navigate to server directory:
```bash
cd server
```

2. Create `.env` file:
```bash
# Windows PowerShell
New-Item .env

# Windows CMD
type nul > .env

# Mac/Linux
touch .env
```

3. Open `.env` in a text editor and add:
```env
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/database_name
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your_azure_openai_api_key_here
AZURE_OPENAI_API_VERSION=2024-02-15-preview
AZURE_OPENAI_DEPLOYMENT_NAME=your_deployment_name
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Install dependencies:
```bash
npm install
```

## Step 3: Configure Client

1. Navigate to client directory:
```bash
cd client
```

2. Create `.env` file:
```bash
# Windows PowerShell
New-Item .env

# Windows CMD
type nul > .env

# Mac/Linux
touch .env
```

3. Open `.env` and add:
```env
VITE_API_BASE_URL=http://localhost:8080
```

4. Install dependencies:
```bash
npm install
```

## Step 4: Run the Application

Open two terminal windows.

**Terminal 1 - Start Server:**
```bash
cd server
npm start
```
You should see: "Server has started on port 8080"

**Terminal 2 - Start Client:**
```bash
cd client
npm run dev
```
The app will open at `http://localhost:5173`

## Step 5: Test the Application

1. Open your browser to `http://localhost:5173`
2. Click "Create" button
3. Enter your name and a prompt (e.g., "a futuristic robot in space")
4. Click "Generate"
5. Wait for the image to generate
6. Click "Share with community" to save it

## Troubleshooting

### Server won't start
- Check if MongoDB connection string is correct
- Verify all environment variables are set
- Make sure port 8080 is not already in use

### Client shows errors
- Verify the server is running on port 8080
- Check that `VITE_API_BASE_URL` is set correctly
- Clear browser cache and reload

### "API key is invalid" error
- Verify your Azure OpenAI API key is correct
- Check that you have an active Azure subscription
- Make sure the endpoint URL is correct
- Verify the deployment name exists
- Make sure there are no extra spaces in the `.env` file

### Images not uploading to Cloudinary
- Verify your Cloudinary credentials
- Check that your account is not over quota
- Ensure CORS is configured properly

## Next Steps

Once everything is working:

1. **Customize the prompts** - Edit `client/src/constants/index.js` to add your own prompt ideas
2. **Update the branding** - Change logos, colors, and text in the client files
3. **Deploy** - Deploy to Render, Vercel, or Netlify
4. **Share** - Show off your AI image generation app!

## Need Help?

Check out:
- [SETUP.md](SETUP.md) - Detailed setup instructions
- [CONFIG.md](CONFIG.md) - Configuration details
- [AZURE_OPENAI_SETUP.md](AZURE_OPENAI_SETUP.md) - Azure OpenAI setup
- [../README.md](../README.md) - Project overview
