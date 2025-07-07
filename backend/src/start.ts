import chalk from "chalk";
import app from "./app.ts";
import { NODE_ENV } from "./utils/env.ts";

// Environment variables with fallback defaults
const port = parseInt(process.env.PORT || "5000", 10);

app.listen(port, () => {
  console.clear();
  console.log(
    chalk.greenBright(`🚀 [${NODE_ENV.toUpperCase()}] Server is up and running!`),
  );
  console.log(
    chalk.yellow(`🌐 Listening at: `) +
      chalk.cyanBright(`http://localhost:${port}`),
  );
});
