const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./src/routes/authRoutes");
const protectedRoutes = require("./src/routes/protectedRoutes");

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);

app.get("/auth");

try {
  mongoose
    .connect(
      "mongodb+srv://jeevanjames2000:f8ZTjJfRumUIcfdi@cluster0.8satn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(app.listen(5000, () => console.log("App listening at port 5000")));
} catch (error) {
  console.log(error);
}
