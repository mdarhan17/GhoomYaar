import { app } from "./app.js";
import { env } from "./config/env.js";
import {
  connectDatabase,
  disconnectDatabase
} from "./config/database.js";

async function bootstrap(): Promise<void> {
  await connectDatabase();

  const server = app.listen(env.PORT, () => {
    console.log("-----------------------------------");
    console.log("GhoomYaar API is running");
    console.log(`Environment: ${env.NODE_ENV}`);
    console.log(`Port: ${env.PORT}`);
    console.log(
      `Health: http://127.0.0.1:${env.PORT}/api/v1/health`
    );
    console.log("-----------------------------------");
  });

  let shuttingDown = false;

  const shutdown = async () => {
    if (shuttingDown) return;

    shuttingDown = true;
    console.log("[SERVER] Shutting down...");

    server.close(async () => {
      try {
        await disconnectDatabase();
        process.exitCode = 0;
      } catch (error) {
        console.error(error);
        process.exitCode = 1;
      }
    });

    server.closeAllConnections();
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

bootstrap().catch((error) => {
  console.error("[STARTUP FAILED]", error);
  process.exitCode = 1;
});