import { app } from "./app.js";
import connectDB from "./db/index.js";

const PORT = process.env.PORT || 8080;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`[server]: Server is listening on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log("MONGO DB Connection Failed !!! ", err);
    });