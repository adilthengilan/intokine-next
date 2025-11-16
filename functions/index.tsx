import * as functions from "firebase-functions";
import * as express from "express";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, conf: { distDir: ".next" } });
const handle = app.getRequestHandler();

const server = express();

server.all("*", async (req: express.Request, res: express.Response) => {
  await app.prepare();
  return handle(req, res);
});

export const nextApp = functions.https.onRequest(server);
