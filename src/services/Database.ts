import mongoose from 'mongoose';
import { MONGO_URI } from '../config';

export default async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        console.log("DB connected successfully")

    } catch (error) {
        console.log(error)
    }
}
