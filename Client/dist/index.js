import express from "express";
import users from "./src/Routes/users.js";
import posts from "./src/Routes/posts.js";
import auth from "./src/Routes/auth.js";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.use("/", users);
app.use("/", posts);
app.use("/", auth);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
