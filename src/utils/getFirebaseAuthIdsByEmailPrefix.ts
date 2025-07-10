import { admin } from '../config/firebase.config.js';
import prisma from '../infrastructure/db/connection/prisma.client.js';

export const getAuthIdsByEmailPrefix = async (prefix: string): Promise<string[]> => {
  const emails: string[] = [];
  let nextPageToken: string | undefined = undefined;

  do {
    const result = await admin.auth().listUsers(1000, nextPageToken);
    result.users.forEach(userRecord => {
      if (userRecord.email && userRecord.email.toLowerCase().startsWith(prefix.toLowerCase())) {
        emails.push(userRecord.email);
      }
    });
    nextPageToken = result.pageToken;
  } while (nextPageToken);

  if (emails.length === 0) return [];
  const auths = await prisma.auth.findMany({
    where: { firebaseId: { in: emails } }
  });
  return auths.map(a => a.id);
}; 