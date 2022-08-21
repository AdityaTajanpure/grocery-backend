const express = require("express");
const connectToDB = require("./config/db");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
app.use(express.json({ extended: false }));

//Connect to database
connectToDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.get("/", (_, res) => {
  res.send(`Server is started`);
});

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //Set a static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));
