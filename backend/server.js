import express from "express";
import path from "path";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorM.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRoutes);

// if (process.env.NODE_ENV === "production") {
//   const __dirname = path.resolve();
//   app.use(express.static(path.join(__dirname, "frontend/dist")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
//   );
// } else {
// }

app.get("/", (req, res) => {
  res.send(`Server ready`);
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
