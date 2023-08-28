import express from "express";
import { config } from "dotenv";
import { userRoutes } from "./routes/UserRoutes";

const app = express();
config();

app.use(express.json());
const port = process.env.PORT || 8080;

app.use(userRoutes);

app.listen(port, () => console.log(`server is running in port ${port}`));
