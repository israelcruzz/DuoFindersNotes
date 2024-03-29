import express, { Response, Request, NextFunction } from "express";
import { route } from "./routes";
import { handleError } from "./utills/handleErrors";
import path from "path";
import cors from 'cors';

const app = express();
const port = 3030;

app.use(cors())
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(express.json());

app.use(
  (error: any, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof handleError) {
      return response.status(error.error).json({
        status: "error",
        message: error.message,
      });
    }

    return response.send(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

app.use(route);

app.listen(port, () => {
  console.log(`🚀Server Online: http://localhost:${port}`);
});
