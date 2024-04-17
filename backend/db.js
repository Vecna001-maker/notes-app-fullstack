const mongoose = require('mongoose');
const dbs="mongodb+srv://sanchit123:sanchit123@cluster0.mqttmqf.mongodb.net/?retryWrites=true&w=majority" 
// | "mongodb://127.0.0.1:27017";
const connectToMongo = async () => {
  try {
    await mongoose.connect(dbs, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;
