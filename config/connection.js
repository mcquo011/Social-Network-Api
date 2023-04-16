const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://localhost/social-network-api";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

module.exports = mongoose.connection;
