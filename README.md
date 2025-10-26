# AI Image Generation with Azure OpenAI and MERN Stack

A full-stack web application that allows users to create AI-generated images using Azure OpenAI's DALL-E API. This project demonstrates the power of AI image generation with a modern, minimal interface, community sharing, and interactive features.

## ❇️ Features

* **Modern & Minimal Interface** - Clean design for easy navigation
* **AI Image Generation** - Create stunning images using Azure OpenAI's DALL-E API
* **Community Sharing** - Share your creations with the community
* **Search Functionality** - Find images by keywords or usernames
* **Download Images** - Save generated images to your device
* **Surprise Me** - Get random prompt suggestions for inspiration
* **Interactive Hover Effects** - View details, prompts, and usernames on hover

## 🧑‍💻 Tech Stack

**Client:** HTML, TailwindCSS, JavaScript, React, Vite

**Server:** Node.js, Express.js, MongoDB

**Services:** Azure OpenAI DALL-E API, Cloudinary

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (free tier available)
- Azure OpenAI account and API key
- Cloudinary account (free tier available)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd project-ai-img-gen
```

2. **Set up Server**

Create a `server/.env` file with your credentials:
```env
MONGODB_URL=your_mongodb_connection_string
AZURE_OPENAI_ENDPOINT=your_azure_openai_endpoint
AZURE_OPENAI_API_KEY=your_azure_openai_api_key
AZURE_OPENAI_API_VERSION=2024-02-15-preview
AZURE_OPENAI_DEPLOYMENT_NAME=your_deployment_name
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Install dependencies and start the server:
```bash
cd server
npm install
npm start
```

3. **Set up Client**

Create a `client/.env` file:
```env
VITE_API_BASE_URL=http://localhost:8080
```

Install dependencies and start the client:
```bash
cd client
npm install
npm run dev
```

Visit `http://localhost:5173` to see the application!

## 📖 Detailed Setup

For step-by-step instructions on getting API keys and setting up the project, see:
- [docs/SETUP.md](docs/SETUP.md) - Complete setup guide
- [docs/AZURE_OPENAI_SETUP.md](docs/AZURE_OPENAI_SETUP.md) - Azure OpenAI setup
- [docs/CONFIG.md](docs/CONFIG.md) - Configuration details
- [docs/GETTING_STARTED.md](docs/GETTING_STARTED.md) - Quick start guide

## 🧐 How to Use

1. **Browse Community Images** - View the showcase on the home page
2. **Create New Image** - Click "Create" button to generate images
3. **Generate AI Images** - Enter a prompt or use "Surprise Me" for ideas
4. **Share with Community** - Upload your creations to the showcase
5. **Search & Download** - Find and save favorite images

## 🏗️ Project Structure

```
project-ai-img-gen/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
├── server/          # Express backend
│   ├── routes/
│   └── mongodb/
├── docs/            # Documentation
│   ├── README.md
│   ├── GETTING_STARTED.md
│   ├── SETUP.md
│   ├── CONFIG.md
│   ├── AZURE_OPENAI_SETUP.md
│   ├── QUICK_REFERENCE.md
│   └── UI_IMPROVEMENTS.md
└── README.md
```

## 🔧 Configuration

The application uses environment variables for configuration:

**Server** (`.env` in `server/`):
- MongoDB connection URL
- Azure OpenAI credentials (endpoint, API key, API version, deployment name)
- Cloudinary credentials

**Client** (`.env` in `client/`):
- API base URL

See [docs/CONFIG.md](docs/CONFIG.md) for detailed configuration instructions.

## 📝 License

This project is open source and available for personal and educational use.
