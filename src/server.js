require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const userRoutes = require("./routes/user.routes");
const universityRoutes = require("./routes/university.routes");
const facultyRoutes = require("./routes/faculty.routes");

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/university", universityRoutes);
app.use("/faculty", facultyRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await sequelize.sync();
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("Database connection failed:", error);
  }
});
