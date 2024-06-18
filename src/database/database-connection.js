import * as SQLite from 'expo-sqlite';

let db;

export const DatabaseConnection = {
  getConnection: async () => {
    if (!db) {
      db = await SQLite.openDatabaseAsync('myDatabase.db');
    }
    return db;
  },
};

