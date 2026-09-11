const mongoose = require("mongoose");
const DB = process.env.MONGO_URI;
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(DB);

        console.log(
            `MongoDB Connected: ${connection.connection.host}`
        );
    } catch (error) {
        console.error("MongoDB connection failed:");
        console.error(error.message);
        process.exit(1);
    }
};
module.exports = connectDB;