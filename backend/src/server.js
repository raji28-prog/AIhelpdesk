import { setServers } from 'dns';
// Fix: Node.js defaults to 127.0.0.1 DNS which has no listener — override with Google DNS
// so MongoDB Atlas SRV records can be resolved correctly.
setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildApp } from './app.js';
import { connectDB } from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environmental variables from the absolute path of the backend directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const port = process.env.PORT || 5000;
const host = '0.0.0.0'; // Essential for cloud deployment (e.g. Render, Docker)

const startServer = async () => {
  // Initialize Database Connection Setup
  // Note: For local start without a running MongoDB, it will try to connect and log messages.
  await connectDB();

  // Create app instance
  const app = await buildApp({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    },
  });

  try {
    await app.listen({ port: Number(port), host });
    console.log(`🚀 Server successfully listening at http://${host}:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

startServer();
