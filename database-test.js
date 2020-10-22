const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const databaseTest = async () => {
  const db = await open({
    filename: "./appdb.sqlite",
    driver: sqlite3.Database,
  });

  await db.migrate({ force: true });

  const products = await db.all("SELECT * FROM Products");
  console.log(products);
};

databaseTest();
