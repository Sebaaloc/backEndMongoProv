const mongoose = require('mongoose');
const config = require('../../config/index');

// Creates the connection to MongoDB using the information within config
mongoose.connect(config.common.database.route, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(db => console.log('db connected'))
    .catch(err => console.log(err));

module.exports = mongoose;