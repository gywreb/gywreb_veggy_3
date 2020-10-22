import { open } from "sqlite";
import sqlite3 from "sqlite3";

export const openDB = async () => {
  const db = await open({
    filename: "./appdb.sqlite",
    driver: sqlite3.Database,
  });

  return db;
};
