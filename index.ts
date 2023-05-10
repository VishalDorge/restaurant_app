import { config } from "dotenv";
config();

import { startServer } from "./app/app";
startServer();

// import { populateDb } from "./app/utility/populate.db";
// populateDb();