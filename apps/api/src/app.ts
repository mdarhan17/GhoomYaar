import express, {
  type Request,
  type Response,
  type NextFunction
} from "express";

import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import { API_PREFIX } from "@ghoomyaar/shared";
import { env } from "./config/env.js";
import { healthRouter } from "./core/routes/health.routes.js";

export const app = express();

app.disable("x-powered-by");

app.use(helmet());

app.use(cors({
  origin: env.CLIENT_ORIGIN,
  credentials: true
}));

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({
  extended: false,
  limit: "1mb"
}));

app.use(cookieParser());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 150,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
}));

app.use(API_PREFIX, healthRouter);

app.get("/", (_req, res) => {
  res.json({
    name: "GhoomYaar",
    version: "v1",
    message: "Welcome to GhoomYaar API"
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.path}`
  });
});

app.use((
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("[API ERROR]", error);

  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});