import { PrismaClient } from '@prisma/client';
import { config } from '../../../config/env';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: config.databaseUrl,
    },
  },
});

export default prisma;
