# Quick Reference Guide

This document provides quick access to important information for working with your AI Image Generation project.

## File Structure

```
project-ai-img-gen/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── constants/        # Configuration constants
│   │   └── utils/            # Utility functions
│   ├── .env                   # Client environment variables
│   └── package.json
│
├── server/                    # Express backend
│   ├── routes/                # API routes
│   ├── mongodb/               # Database models
│   ├── .env                   # Server environment variables
│   └── package.json
│
├── .gitignore                 # Git ignore rules
├── README.md                  # Project overview
├── GETTING_STARTED.md        # Step-by-step setup
├── SETUP.md                   # Detailed setup guide
└── CONFIG.md                  # Configuration details
```

## Environment Variables

### Server (.env in server/ directory)
```env
MONGODB_URL=your_mongodb_connection_string
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your_azure_openai_api_key
AZURE_OPENAI_API_VERSION=2024-02-15-preview
AZURE_OPENAI_DEPLOYMENT_NAME=your_deployment_name
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Client (.env in client/ directory)
```env
VITE_API_BASE_URL=http://localhost:8080
```

## Common Commands

### Development
```bash
# Start server
cd server && npm start

# Start client
cd client && npm run dev
```

### Production
```bash
# Build client
cd client && npm run build

# The build output will be in client/dist/
```

## API Endpoints

### Server Endpoints
- `GET /` - Server status
- `GET /api/v1/post` - Get all posts
- `POST /api/v1/post` - Create a new post
- `GET /api/v1/dalle` - DALL-E API status
- `POST /api/v1/dalle` - Generate image

### Request/Response Examples

**Generate Image:**
```javascript
POST /api/v1/dalle
Body: { "prompt": "a futuristic robot in space" }
Response: { "photo": "base64_image_string" }
```

**Create Post:**
```javascript
POST /api/v1/post
Body: {
  "name": "John Doe",
  "prompt": "a futuristic robot in space",
  "photo": "data:image/jpeg;base64,..."
}
Response: { "success": true, "data": {...} }
```

## Key Files to Customize

### 1. Prompts (client/src/constants/index.js)
Edit `surpriseMePrompts` array to add your own prompt ideas.

### 2. Styling
- `client/src/index.css` - Global styles
- `client/tailwind.config.cjs` - Tailwind configuration
- `client/src/components/` - Component styling

### 3. Content
- `client/src/App.jsx` - Header and navigation
- `client/src/pages/Home.jsx` - Home page content
- `client/src/pages/CreatePost.jsx` - Create page content

### 4. Branding
- `client/src/assets/logo.svg` - Your logo
- `client/index.html` - Page title and meta tags

## Troubleshooting Quick Fixes

### "Cannot find module" errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Server connection refused
```bash
# Check if server is running on port 8080
netstat -an | findstr 8080

# Or try a different port
# Update server/index.js to use a different port
```

### CORS errors
Make sure your client URL matches the allowed origins in your server configuration.

### API key errors
- Verify the key is correct in `.env` file
- Check there are no extra spaces or quotes
- Ensure you have credits in your OpenAI account

## Deployment Checklist

Before deploying to production:

- [ ] Update `VITE_API_BASE_URL` to production server URL
- [ ] Set up production database
- [ ] Configure CORS for production domain
- [ ] Update API keys for production
- [ ] Test all functionality
- [ ] Set up error monitoring
- [ ] Configure HTTPS
- [ ] Set up domain name

## Useful Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

## Need Help?

1. Check [GETTING_STARTED.md](GETTING_STARTED.md) for setup instructions
2. See [SETUP.md](SETUP.md) for detailed configuration
3. Read [CONFIG.md](CONFIG.md) for environment variables
4. Review [AZURE_OPENAI_SETUP.md](AZURE_OPENAI_SETUP.md) for Azure setup
5. See [../README.md](../README.md) for overview
