import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorM.js";
import userRoutes from "./routes/userRoutes.js";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

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
