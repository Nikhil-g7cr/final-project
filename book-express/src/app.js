import express from "express";

import authorRoute from "./routes/author.route.js";
import bookRoute from "./routes/book.route.js";
import reviewRoute from "./routes/review.route.js";
import userRoute from "./routes/user.route.js";
import { parseJwtToken } from "./utils/jwt.js";

const app = express();

app.use(express.static("www"));

app.use(express.json());

app.use((request, response, next) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "*");
  response.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next(); //ok. i am done. more to main request.
});

app.use(parseJwtToken);

// routes
app.use("/api", authorRoute);
app.use("/api", bookRoute);
app.use("/api", reviewRoute);
app.use("/api", userRoute);

export default app;
