import { resetDatabaseSchema } from './db.js';

try {
  resetDatabaseSchema();
  console.log('Authentication schema reset completed.');
  process.exit(0);
} catch (error) {
  console.error('Authentication schema reset failed:', error);
  process.exit(1);
}
