# DreamCanvas - Complete Project Documentation

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [How It Works](#how-it-works)
6. [API Documentation](#api-documentation)
7. [Setup Guide](#setup-guide)
8. [Deployment Guide](#deployment-guide)
9. [Troubleshooting](#troubleshooting)
10. [Features Walkthrough](#features-walkthrough)

---

## 🎯 Project Overview

**DreamCanvas** is a full-stack web application that allows users to generate AI-powered images using Azure OpenAI's DALL-E API and share them with a community. The platform combines modern web technologies with AI capabilities to create an interactive image generation and sharing experience.

### Key Features

- **AI Image Generation**: Create stunning images from text prompts using Azure OpenAI DALL-E 3
- **Community Showcase**: Share generated images with the community
- **Smart Search**: Search through community posts by username or prompt keywords
- **User-Friendly Interface**: Modern, responsive design with smooth animations
- **Real-time Updates**: See community posts in real-time

---

## 🏗️ System Architecture

### Architecture Diagram

```
┌─────────────────┐
│   User Browser  │
└────────┬────────┘
         │
         │ HTTP Requests
         │
┌────────▼─────────────────────────────────────┐
│         React Frontend (Client)               │
│  - Vite Build Tool                            │
│  - React Router for Navigation               │
│  - TailwindCSS for Styling                    │
└────────┬─────────────────────────────────────┘
         │
         │ REST API Calls
         │
┌────────▼─────────────────────────────────────┐
│      Express.js Backend (Server)             │
│  - API Routes                                  │
│  - Request Validation                          │
│  - Error Handling                              │
└────────┬─────────────────────────────────────┘
         │
         ├──────────────────┬──────────────────┐
         │                  │                  │
┌────────▼────────┐  ┌──────▼──────┐  ┌───────▼─────────┐
│  Azure OpenAI   │  │ Cloudinary  │  │   MongoDB       │
│  DALL-E API     │  │  (Image     │  │   (Database)    │
│                 │  │  Storage)   │  │                 │
└─────────────────┘  └─────────────┘  └─────────────────┘
```

### Data Flow

1. **User generates image:**
   - User enters prompt → Frontend sends POST request → Backend calls Azure OpenAI → Returns base64 image → Frontend displays image

2. **User shares image:**
   - User clicks "Share" → Frontend sends image data → Backend uploads to Cloudinary → Saves metadata to MongoDB → Returns success → Frontend navigates to home

3. **User browses community:**
   - User visits home → Frontend requests posts → Backend queries MongoDB → Returns posts → Frontend displays in grid

---

## 💻 Technology Stack

### Frontend (Client)

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI framework for building interactive components | Latest |
| **Vite** | Fast build tool and dev server | Latest |
| **React Router** | Client-side routing | Latest |
| **TailwindCSS** | Utility-first CSS framework | Latest |
| **JavaScript (ES6+)** | Programming language | ES2020+ |

**Why these choices?**
- React provides component reusability and efficient rendering
- Vite offers lightning-fast development and optimized production builds
- TailwindCSS enables rapid UI development with utility classes
- React Router handles client-side navigation without page reloads

### Backend (Server)

| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | JavaScript runtime environment | 20.x |
| **Express.js** | Web framework for API routes | 4.18+ |
| **MongoDB** | NoSQL database for storing posts | Latest |
| **Mongoose** | MongoDB object modeling | 6.10+ |
| **OpenAI SDK** | Azure OpenAI integration | 6.7.0 |
| **Cloudinary** | Cloud-based image management | 1.34+ |
| **CORS** | Cross-origin resource sharing | 2.8+ |
| **dotenv** | Environment variable management | 16.0+ |

**Why these choices?**
- Node.js allows JavaScript on both frontend and backend
- Express.js is lightweight and flexible for REST APIs
- MongoDB handles document-based data efficiently
- Cloudinary provides reliable image storage and CDN

### External Services

| Service | Purpose |
|---------|---------|
| **Azure OpenAI** | DALL-E 3 API for AI image generation |
| **Cloudinary** | Cloud storage and delivery for uploaded images |
| **MongoDB Atlas** | Cloud-hosted MongoDB database |
| **Render** | Cloud hosting platform for deployment |

---

## 📁 Project Structure

```
project-ai-img-gen/
│
├── client/                          # Frontend React Application
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── assets/                   # Images, icons
│   │   │   ├── logo.svg
│   │   │   ├── preview.png
│   │   │   └── download.png
│   │   ├── components/              # Reusable React components
│   │   │   ├── Card.jsx            # Post card component
│   │   │   ├── FormField.jsx       # Input field component
│   │   │   └── Loader.jsx          # Loading spinner
│   │   ├── constants/               # Constants and configuration
│   │   │   └── index.js            # API URL, prompts
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.jsx            # Community showcase
│   │   │   └── CreatePost.jsx     # Image generation page
│   │   ├── utils/                   # Utility functions
│   │   │   └── index.js            # Helper functions
│   │   ├── App.jsx                  # Main app component
│   │   └── main.jsx                # Entry point
│   ├── index.html                   # HTML template
│   ├── package.json                 # Dependencies
│   └── vite.config.js              # Vite configuration
│
├── server/                          # Backend Express Application
│   ├── mongodb/                     # Database configuration
│   │   ├── connect.js              # MongoDB connection
│   │   └── models/
│   │       └── post.js             # Post data model
│   ├── routes/                      # API route handlers
│   │   ├── dalleRoutes.js          # DALL-E image generation
│   │   └── postRoutes.js           # Post CRUD operations
│   ├── index.js                     # Server entry point
│   ├── package.json                 # Dependencies
│   └── .env                         # Environment variables (not in git)
│
├── docs/                            # Project documentation
│   ├── PROJECT_DOCUMENTATION.md    # This file
│   ├── SETUP.md                     # Setup instructions
│   ├── CONFIG.md                    # Configuration guide
│   └── ...
│
├── .gitignore                       # Git ignore rules
├── render.yaml                      # Render deployment config
└── README.md                        # Main readme
```

---

## 🔄 How It Works

### 1. Image Generation Flow

```javascript
// Step 1: User enters prompt in CreatePost.jsx
const generateImage = async () => {
  // Step 2: Frontend sends POST request to backend
  const response = await fetch(`${API_BASE_URL}/api/v1/dalle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: form.prompt })
  });
  
  // Step 3: Backend receives request (dalleRoutes.js)
  const azureClient = new OpenAI({
    baseURL: `${endpoint}openai/deployments/${deployment}/`,
    apiKey: process.env.AZURE_OPENAI_API_KEY,
    defaultQuery: { 'api-version': apiVersion }
  });
  
  // Step 4: Call Azure OpenAI API
  const response = await azureClient.images.generate({
    prompt: prompt,
    n: 1,
    size: '1024x1024',
    response_format: 'b64_json'
  });
  
  // Step 5: Return base64 image to frontend
  res.status(200).json({ photo: response.data[0].b64_json });
  
  // Step 6: Frontend displays image
  setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
};
```

### 2. Community Posting Flow

```javascript
// Step 1: User clicks "Share with community"
const handleSubmit = async (e) => {
  // Step 2: Frontend sends POST request with image data
  const response = await fetch(`${API_BASE_URL}/api/v1/post`, {
    method: 'POST',
    body: JSON.stringify({
      name: form.name,
      prompt: form.prompt,
      photo: form.photo // base64 data URL
    })
  });
  
  // Step 3: Backend receives request (postRoutes.js)
  // Step 4: Upload to Cloudinary
  const uploadResult = await cloudinary.uploader.upload(photo, {
    folder: 'ai-image-gen',
    resource_type: 'image'
  });
  
  // Step 5: Save to MongoDB
  const newPost = await Post.create({
    name,
    prompt,
    photo: uploadResult.secure_url
  });
  
  // Step 6: Return success, frontend navigates to home
  res.status(201).json({ success: true, data: newPost });
  navigate('/');
};
```

### 3. Community Browsing Flow

```javascript
// Step 1: Component mounts (Home.jsx)
useEffect(() => {
  // Step 2: Fetch all posts from backend
  const response = await fetch(`${API_BASE_URL}/api/v1/post`);
  
  // Step 3: Backend queries MongoDB (postRoutes.js)
  const posts = await Post.find({});
  
  // Step 4: Return posts to frontend
  res.status(200).json({ success: true, data: posts });
  
  // Step 5: Frontend displays posts in grid
  setAllPosts(result.data.reverse());
}, []);
```

### 4. Search Functionality

```javascript
// Real-time search as user types
const handleSearchChange = (e) => {
  // Debounce search (wait 500ms after user stops typing)
  clearTimeout(searchTimeout);
  setSearchText(e.target.value);
  
  setSearchTimeout(
    setTimeout(() => {
      // Filter posts by name or prompt
      const searchResults = allPosts.filter((item) => 
        item.name.toLowerCase().includes(searchText.toLowerCase()) || 
        item.prompt.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchedResults(searchResults);
    }, 500)
  );
};
```

---

## 🔌 API Documentation

### Base URL
- **Development**: `http://localhost:8080`
- **Production**: `https://ai-image-generation-backend-ixhr.onrender.com`

### Endpoints

#### 1. Generate Image

**POST** `/api/v1/dalle`

Generate an AI image from a text prompt.

**Request Body:**
```json
{
  "prompt": "A futuristic robot exploring a neon-lit cyberpunk city"
}
```

**Response:**
```json
{
  "photo": "base64_encoded_image_string"
}
```

**Error Response:**
```json
{
  "error": "Image generation failed",
  "message": "Detailed error message",
  "details": {}
}
```

#### 2. Get All Posts

**GET** `/api/v1/post`

Retrieve all community posts.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "post_id",
      "name": "John Doe",
      "prompt": "Image prompt",
      "photo": "https://cloudinary_url/image.jpg",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### 3. Create Post

**POST** `/api/v1/post`

Share an image with the community.

**Request Body:**
```json
{
  "name": "John Doe",
  "prompt": "Image generation prompt",
  "photo": "data:image/jpeg;base64,..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "post_id",
    "name": "John Doe",
    "prompt": "Image generation prompt",
    "photo": "https://cloudinary_url/image.jpg"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message"
}
```

---

## 🚀 Setup Guide

### Prerequisites

1. **Node.js** (v20.x or higher)
   - Download from [nodejs.org](https://nodejs.org)
   - Verify: `node --version`

2. **Git**
   - Download from [git-scm.com](https://git-scm.com)

3. **MongoDB Atlas Account**
   - Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Create a free cluster

4. **Azure OpenAI Account**
   - Access through Azure Portal
   - Create DALL-E 3 deployment

5. **Cloudinary Account**
   - Sign up at [cloudinary.com](https://cloudinary.com)
   - Get API credentials

### Step-by-Step Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/saivamshi4121/Ai_image_generation.git
cd Ai_image_generation
```

#### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
touch .env
```

**Add to `server/.env`:**
```env
# MongoDB Configuration
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/database_name

# Azure OpenAI Configuration
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your_api_key_here
AZURE_OPENAI_API_VERSION=2024-04-01-preview
AZURE_OPENAI_DEPLOYMENT_NAME=your_deployment_name

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server Port (optional)
PORT=8080
```

**Start the server:**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

Server should run on `http://localhost:8080`

#### 3. Frontend Setup

```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install

# Create .env file
touch .env
```

**Add to `client/.env`:**
```env
VITE_API_BASE_URL=http://localhost:8080
```

**Start the frontend:**
```bash
npm run dev
```

Frontend should run on `http://localhost:5173`

---

## 🌐 Deployment Guide

### Deploy to Render

#### 1. Backend Deployment (Web Service)

1. Go to [render.com](https://render.com) and sign up/login
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `Ai_image_generation`
   - **Root Directory**: `server`
   - **Branch**: `main`
   - **Region**: Choose closest region
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js` or `npm start`
   - **Instance Type**: Free

5. Add Environment Variables:
   ```
   MONGODB_URL=your_mongodb_url
   AZURE_OPENAI_ENDPOINT=your_endpoint
   AZURE_OPENAI_API_KEY=your_key
   AZURE_OPENAI_API_VERSION=2024-04-01-preview
   AZURE_OPENAI_DEPLOYMENT_NAME=your_deployment
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_secret
   ```

6. Click **Create Web Service**

#### 2. Frontend Deployment (Static Site)

1. Click **New +** → **Static Site**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `ai-img-gen-web`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. Add Environment Variable:
   ```
   VITE_API_BASE_URL=https://your-backend-url.onrender.com
   ```
   ⚠️ **Important**: Set this BEFORE the first deploy, as Vite injects env vars at build time

5. Click **Create Static Site**

#### 3. Post-Deployment

- Update frontend environment variable with actual backend URL
- Test all functionality
- Monitor logs in Render dashboard

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Backend won't start

**Error**: `Cannot find module`
- **Solution**: Ensure `rootDir` is set to `server` in Render
- Check `Start Command` is `node index.js` or `npm start`

**Error**: `MongoDB connection failed`
- **Solution**: Verify `MONGODB_URL` in environment variables
- Check MongoDB Atlas IP whitelist includes Render IPs (or 0.0.0.0/0)

#### 2. Image generation fails

**Error**: `404 Resource not found`
- **Solution**: 
  - Verify Azure OpenAI endpoint URL ends with `/`
  - Check deployment name matches exactly
  - Verify API version is correct (2024-04-01-preview)

**Error**: `401 Unauthorized`
- **Solution**: Check `AZURE_OPENAI_API_KEY` is correct

#### 3. Community posting fails

**Error**: `Image upload failed`
- **Solution**: 
  - Verify Cloudinary credentials
  - Check environment variables are set correctly
  - Review server logs for detailed error

**Error**: `Server missing Cloudinary configuration`
- **Solution**: Ensure all three Cloudinary env vars are set

#### 4. Frontend can't connect to backend

**Error**: CORS error in browser
- **Solution**: Backend has `app.use(cors())` which should allow all origins
- Check backend URL in frontend `.env` matches deployed URL

**Error**: Network request failed
- **Solution**: 
  - Verify `VITE_API_BASE_URL` is set correctly
  - Rebuild frontend after changing env vars (Vite needs rebuild)
  - Check backend is deployed and running

#### 5. Posts don't display

**Error**: Empty community showcase
- **Solution**: 
  - Check MongoDB connection in server logs
  - Verify posts exist in MongoDB Atlas
  - Check browser console for API errors

---

## ✨ Features Walkthrough

### 1. Home Page (`Home.jsx`)

**Purpose**: Display community-generated images

**Features**:
- Fetches all posts on component mount
- Search functionality with debouncing
- Responsive grid layout
- Empty state handling
- Loading states

**Key Code**:
```javascript
useEffect(() => {
  // Fetch posts when component loads
  const fetchPosts = async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/post`);
    const result = await response.json();
    setAllPosts(result.data.reverse()); // Newest first
  };
  fetchPosts();
}, []);
```

### 2. Create Post Page (`CreatePost.jsx`)

**Purpose**: Generate and share AI images

**Features**:
- Text prompt input
- "Surprise Me" random prompt generator
- Image generation with loading state
- Image preview
- Form validation
- Community sharing

**Key Code**:
```javascript
const generateImage = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/dalle`, {
    method: 'POST',
    body: JSON.stringify({ prompt: form.prompt })
  });
  const data = await response.json();
  setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
};
```

### 3. Components

**Card.jsx**: Displays individual post with image, prompt, and creator name

**FormField.jsx**: Reusable input field component with label

**Loader.jsx**: Loading spinner for async operations

---

## 📊 Data Models

### Post Schema (MongoDB)

```javascript
{
  _id: ObjectId,           // Auto-generated by MongoDB
  name: String,            // Creator's name
  prompt: String,          // Image generation prompt
  photo: String,           // Cloudinary URL
  createdAt: Date,        // Auto-generated timestamp
  updatedAt: Date         // Auto-generated timestamp
}
```

---

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **API Keys**: Store securely, rotate regularly
3. **CORS**: Configured to allow cross-origin requests (adjust for production)
4. **Input Validation**: Basic validation on server-side
5. **Error Messages**: Don't expose sensitive info in error responses

---

## 📈 Future Enhancements

Potential improvements:
- User authentication and profiles
- Image editing capabilities
- Like/comment system
- Download counter
- Advanced search filters
- Image collections/favorites
- Social sharing integration
- Rate limiting
- Image moderation

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Azure OpenAI Docs](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Render Documentation](https://render.com/docs)

---

## 🤝 Contributing

This is a learning project. Feel free to fork and enhance!

---

## 📝 License

This project is open source and available for personal and educational use.

---

## 👨‍💻 Author

**Saivamshi** - [GitHub](https://github.com/saivamshi4121)

---

*Last Updated: October 2024*

