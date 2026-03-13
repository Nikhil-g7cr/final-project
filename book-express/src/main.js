import dotenv from "dotenv";
import http from "http";
dotenv.config();

import './dependency.js';

import { run } from "./repository/mongoose/connect.js";
import app from "./app.js";
const server = http.createServer(app);

let port = process.argv[2] ?? process.env.PORT ?? 80;

port = Number(port);

server.on("error", (error) =>
  console.error(`Error sarting server on port {$port}`),
);

async function startServer() {
  try {
    await run();
    server.listen(port, () =>
      console.log(`-->server started: http://localhost:${port}`),
    );
  } catch (error) {
    console.log(`Error:-${error}`)
  }
}

 
startServer();

