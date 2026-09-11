const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config();
const app = require('./src/app')
const PORT = process.env.PORT
const connectDB = require('./src/config/db');


const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(
            `Server running on port ${PORT}`
        );
    }
    );
};
startServer();



