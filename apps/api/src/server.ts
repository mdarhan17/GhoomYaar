import { createServer } from 'node:http';
import { createApp } from './app.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { env } from './config/env.js';

async function main() {
  await connectDatabase();
  const server = createServer(createApp());
  server.listen(env.PORT, () => console.info(`[api] running on http://localhost:${env.PORT}`));
  let shuttingDown = false;
  const shutdown = async () => {
    if (shuttingDown) return;
    shuttingDown = true;
    console.info('[api] shutting down');
    server.close(async error => {
      try { await disconnectDatabase(); } finally { process.exit(error ? 1 : 0); }
    });
  };
  process.once('SIGINT', shutdown);
  process.once('SIGTERM', shutdown);
}
main().catch(error => { console.error('[api] startup failed', error); process.exitCode = 1; });