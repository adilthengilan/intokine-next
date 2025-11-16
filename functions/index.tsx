import express from "express";
import next from "next";

const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

const server = express(); // ✅ fixed

server.all("*", async (req, res) => {
  await app.prepare();
  return handle(req, res);
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
