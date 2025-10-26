# Azure OpenAI Setup Guide

This guide will help you set up Azure OpenAI for your AI Image Generation project.

## Step 1: Create Azure Account

1. Go to https://azure.microsoft.com/
2. Sign up for a free account
3. You'll get $200 in Azure credits to start

## Step 2: Create Azure OpenAI Resource

1. Go to https://portal.azure.com/
2. Click "Create a resource"
3. Search for "Azure OpenAI"
4. Click "Create"
5. Fill in the form:
   - **Subscription**: Select your subscription
   - **Resource Group**: Create new or use existing
   - **Region**: Choose closest region
   - **Name**: Your resource name (e.g., "ai-img-gen-openai")
   - **Pricing tier**: Choose based on your needs
6. Click "Review + create", then "Create"
7. Wait for deployment (2-5 minutes)

## Step 3: Get Your Credentials

### 3.1 Get Endpoint
1. Go to your Azure OpenAI resource
2. Click on "Keys and Endpoint"
3. Copy the **Endpoint** URL
   - Example: `https://your-resource.openai.azure.com/`

### 3.2 Get API Key
1. In the same "Keys and Endpoint" section
2. Copy either **KEY 1** or **KEY 2**
3. Save it securely (you'll need it for `.env` file)

### 3.3 API Version
- Current recommended: `2024-02-15-preview`
- Check latest at: https://learn.microsoft.com/en-us/azure/cognitive-services/openai/reference

## Step 4: Create DALLE Deployment

1. Go to your Azure OpenAI resource
2. Click on "Model deployments" in the left sidebar
3. Click "Create" or "Manage deployments"
4. Click "Create new deployment"
5. Fill in:
   - **Name**: Choose a deployment name (e.g., "dalle-3")
   - **Model**: Select "dall-e-3" or "dall-e-2"
   - **Model version**: Latest available
   - **Capacity**: Based on your plan
6. Click "Create"
7. Wait for deployment to complete

## Step 5: Configure Your .env File

Add these variables to your `server/.env` file:

```env
# Azure OpenAI Configuration
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your_api_key_here
AZURE_OPENAI_API_VERSION=2024-02-15-preview
AZURE_OPENAI_DEPLOYMENT_NAME=your_deployment_name
```

## Step 6: Test Your Setup

1. Start your server:
```bash
cd server
npm start
```

2. Test the API endpoint:
```bash
curl -X POST http://localhost:8080/api/v1/dalle \
  -H "Content-Type: application/json" \
  -d '{"prompt": "a beautiful sunset over mountains"}'
```

## Troubleshooting

### Common Issues

**Issue**: "Resource not found"
- **Solution**: Check that the endpoint URL includes the correct resource name

**Issue**: "Authorization failed"
- **Solution**: Verify your API key is correct and hasn't expired

**Issue**: "Deployment not found"
- **Solution**: Ensure you've created the deployment in Azure Portal and used the exact deployment name

**Issue**: "Model not available"
- **Solution**: Check that DALLE model is available in your region

## Cost Management

- Monitor your usage in Azure Portal
- Set up budget alerts
- Check pricing: https://azure.microsoft.com/pricing/details/cognitive-services/openai-service/
- Use Azure Cost Management to track spending

## Security Best Practices

1. Never commit `.env` file to version control
2. Rotate API keys regularly
3. Use Azure Key Vault for production
4. Restrict access using Azure RBAC
5. Enable Azure Monitor for logging

## Next Steps

- See [CONFIG.md](CONFIG.md) for full configuration
- Check [SETUP.md](SETUP.md) for complete setup guide
- Review [../README.md](../README.md) for project overview

## Additional Resources

- Azure OpenAI Documentation: https://learn.microsoft.com/en-us/azure/cognitive-services/openai/
- Pricing Calculator: https://azure.microsoft.com/pricing/details/cognitive-services/openai-service/
- API Reference: https://learn.microsoft.com/en-us/azure/cognitive-services/openai/reference
