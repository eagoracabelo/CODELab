import express from "express";
import { Client } from "pg";

async function main() {
  const client = new Client();
  await client.connect();

  const res = await client.query("SELECT $1::text as message", [
    "Hello world, postgresql!",
  ]);
  console.log(res.rows[0].message);
  await client.end;

  const app = express();
  const port = 3000;

  app.get("/", (req, res) => {
    res.send("Vai alteração!");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

main();
