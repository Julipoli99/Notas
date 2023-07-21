import express from "express";
import route from "./router/route";
import morgan from "morgan";
import path from "path";
import bodyParser from "body-parser";

const app = express();

(async () => {
  await app.listen(3000);
  console.log("Server running on port 3000");
})();

app.use(bodyParser.json())

app.use(express.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(morgan("dev"));

app.use(route);

export default app;
