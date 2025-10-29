import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
//GET ALL POSTS
router.route('/').get(async(req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});

//CREATE A POST
router.route('/').post(async(req, res) => {
    try {
        console.log('Post request received');
        let { name, prompt, photo } = req.body;

        // Default name if not provided
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            name = 'Anonymous';
        }
        console.log('Validating input:', { name, hasPrompt: !!prompt, hasPhoto: !!photo, photoLength: photo?.length });

        if (!prompt || !photo) {
            console.log('Validation failed: missing prompt or photo');
            return res.status(400).json({ success: false, message: 'prompt and photo are required' });
        }

        // Ensure Cloudinary receives a data URL or remote URL
        const isDataUrl = typeof photo === 'string' && photo.startsWith('data:image/');
        const isHttpUrl = typeof photo === 'string' && (photo.startsWith('http://') || photo.startsWith('https://'));
        if (!isDataUrl && !isHttpUrl) {
            console.log('Validation failed: photo is not a valid data URL or HTTP URL');
            return res.status(400).json({ success: false, message: 'photo must be a data URL or http(s) URL' });
        }

        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            console.error('Cloudinary configuration missing');
            return res.status(500).json({ success: false, message: 'Server missing Cloudinary configuration' });
        }

        console.log('Uploading to Cloudinary...');
        const uploadResult = await cloudinary.uploader.upload(photo, { 
            folder: 'ai-image-gen', 
            resource_type: 'image' 
        });
        console.log('Cloudinary upload successful:', { url: uploadResult.secure_url || uploadResult.url });
        
        const imageUrl = uploadResult.secure_url || uploadResult.url;
        if (!imageUrl) {
            console.error('Cloudinary upload returned no URL');
            return res.status(500).json({ success: false, message: 'Image upload failed' });
        }

        console.log('Creating post in database...');
        const newPost = await Post.create({
            name,
            prompt,
            photo: imageUrl,
        });
        console.log('Post created successfully:', newPost._id);
        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        console.error('Create post error:', error);
        console.error('Error stack:', error?.stack);
        const message = error?.message || 'Internal server error';
        res.status(500).json({ 
            success: false, 
            message,
            error: process.env.NODE_ENV === 'development' ? error?.stack : undefined
        });
    }
});

export default router;