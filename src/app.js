import express from "express";
import routerGroups from "./groups/groups.router.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/", routerGroups);

app.listen(PORT, () => {
  console.log(`Express server running on port http://localhost:${PORT} 🚀`);
});
