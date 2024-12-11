
const mongoose = require('mongoose');

const dbConnection = async () => {
    const dbUrl = process.env.DB_URL
    try {
        const connect = await mongoose.connect(dbUrl);
        console.log('Database Conncted', connect.connection.host, connect.connection.name);
    }

    catch (e) {
        console.log(e);
    }
}

module.exports = dbConnection;