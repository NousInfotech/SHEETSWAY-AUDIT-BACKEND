import { config } from './config/env.js';
import app from './app.js';
import prisma from './infrastructure/db/connection/prisma.client.js';


const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Connected to the database');
    app.listen(config.port, () => {
      console.log(`🚀 Server running on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to the database:', error);
    process.exit(1);
  }
};

startServer();
