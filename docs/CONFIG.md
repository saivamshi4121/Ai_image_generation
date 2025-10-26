# Configuration Instructions

## Environment Variables Setup

### Server Configuration (server/.env)

Create a `.env` file in the `server` directory with the following variables:

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

### Client Configuration (client/.env)

Create a `.env` file in the `client` directory with the following variables:

```env
VITE_API_BASE_URL=http://localhost:8080
```

For production, update this to your deployed server URL:
```env
VITE_API_BASE_URL=https://your-server-url.com
```

## How to Get Required Credentials

### 1. Azure OpenAI
1. Create an Azure account at https://azure.microsoft.com/
2. Go to Azure Portal
3. Create a new "Azure OpenAI" resource
4. Get your endpoint URL, API key, and deployment name
5. Create a DALLE deployment in your resource

### 2. MongoDB
1. Sign up at https://www.mongodb.com/atlas
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address
5. Get connection string from "Connect your application"

### 3. Cloudinary
1. Sign up at https://cloudinary.com/
2. Dashboard will show your credentials
3. Copy Cloud name, API Key, and API Secret

## Related Documentation

- See [SETUP.md](SETUP.md) for complete setup instructions
- See [AZURE_OPENAI_SETUP.md](AZURE_OPENAI_SETUP.md) for Azure OpenAI details
- See [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for quick API reference

## Important Notes

The code has already been updated to use environment variables. All API calls now use `import.meta.env.VITE_API_BASE_URL` for client-side requests.
