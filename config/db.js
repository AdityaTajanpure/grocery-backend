const mongoose = require("mongoose");
const config = require("config");

const connectToMongo = async () => {
  let dbUri = config.get("mongoURI");
  try {
    await mongoose.connect(dbUri, {
      dbName:
        process.env.NODE_ENV === "production" ? "prod_grocery" : "devo_grocery",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    console.log(`Using ${mongoose.connection.db.databaseName}`);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectToMongo;
