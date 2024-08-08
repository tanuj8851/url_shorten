import express from "express";
import cors from "cors";
import morgan from "morgan";
import connection from "./config/db.js";
import swaggerDocs from "./config/swagger.js";
import authRoutes from "./routes/authRoutes.js";
import urlRoutes from "./routes/urlRoutes.js";

const app = express();

const port = process.env.port || 8001;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//
app.use("/auth", authRoutes);
app.use("/url", urlRoutes);

// Swagger Documentation
swaggerDocs(app);

//Home Route
app.get("/", (req, res) => {
  res.send({ msg: "URL - SHORTNER" });
});

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  try {
    await connection;
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
});
