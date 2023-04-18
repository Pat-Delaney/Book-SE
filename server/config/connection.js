const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/your-database-name');

module.exports = mongoose.connection;
