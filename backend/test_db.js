const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

console.log('Testing MongoDB Connection...');
console.log('URI:', '***');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 // Fail after 5 seconds
})
    .then(() => {
        fs.writeFileSync('db_test_result_quick.txt', 'SUCCESS: Connected to MongoDB');
        console.log('SUCCESS');
        process.exit(0);
    })
    .catch(err => {
        fs.writeFileSync('db_test_result_quick.txt', `FAILURE: ${err.message}\n${err.stack}`);
        console.error('FAILURE');
        process.exit(1);
    });
