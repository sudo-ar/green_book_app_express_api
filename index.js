
// Todo: change password , update profile, check unique email while creating user , dotenv


const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const dbConnect = require("./utils/config");
const buyerRoutes = require("./routes/buyer");
const userRoutes = require("./routes/user");
const reviewRoutes = require("./routes/review");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

dbConnect();

app.use("/api/v1/buyers", buyerRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v2/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello world from sever" });
});

const port = 8000;
const host = "localhost";

app.listen(port, host, () => {
  console.log(`server is listening on http://${host}:${port}`);
});
