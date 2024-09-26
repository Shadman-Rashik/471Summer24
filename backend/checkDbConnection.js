// Import required modules
const mongoose = require('mongoose');
require('dotenv').config();

// Connection URI
const uri = process.env.MONGODB_URI;

console.log("Connecting to MongoDB with URI:", uri);

// Connect to MongoDB database
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB");
  process.exit(0);  // Exit the process with success code
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
  process.exit(1);  // Exit the process with error code
});

