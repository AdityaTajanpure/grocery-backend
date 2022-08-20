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

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));
