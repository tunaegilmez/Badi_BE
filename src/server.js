require("dotenv").config();
const express = require("express");
const setupSwagger = require("../swagger");
const sequelize = require("./config/database");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const authMiddleware = require("./middlewares/authMiddleware");
const categoriesRoutes = require("./routes/categories.routes");
const eventRoutes = require("./routes/event.routes");

const app = express();
app.use(express.json());

setupSwagger(app);

app.get("/", authMiddleware, (req, res) => {
  res.send("WELCOME TO BADI");
});
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/categories", categoriesRoutes);
app.use("/events", eventRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await sequelize.sync();
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`Swagger UI: http://localhost:${PORT}/badiapi`);
  } catch (error) {
    console.error("Database connection failed:", error);
  }
});
