import * as SQLite from 'expo-sqlite';

export const DatabaseConnection = {
  getConnection: async () => await SQLite.openDatabaseAsync('myDatabase.db'),
};
