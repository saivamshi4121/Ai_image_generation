import mongoose from 'mongoose';

const connectDB = async (url) => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(url);
        console.log('MongoDB Connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
}

export default connectDB;