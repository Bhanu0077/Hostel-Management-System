const dotenv = require('dotenv');
const path = require('path');

// Force correct path
dotenv.config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI,
};