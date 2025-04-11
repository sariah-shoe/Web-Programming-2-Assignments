import express from "express";
import registerRoutes from "./routes.js";
import bodyParser from "body-parser";

export default (port) => {
    const app = express();
    app.listen(port, () => console.log(`App started on port ${port}`))
    app.use(bodyParser.json());
    registerRoutes(app);
    return app;
}