import { Router } from "express";
import mongoose from "mongoose";

export const healthRouter = Router();

healthRouter.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      service: "GhoomYaar API",
      status: "running",
      timestamp: new Date().toISOString()
    }
  });
});

healthRouter.get("/ready", (_req, res) => {
  const connected = mongoose.connection.readyState === 1;

  res.status(connected ? 200 : 503).json({
    success: connected,
    data: {
      service: "GhoomYaar API",
      database: connected ? "connected" : "disconnected",
      status: connected ? "ready" : "unavailable"
    }
  });
});