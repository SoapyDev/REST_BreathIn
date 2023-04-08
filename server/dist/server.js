var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import cluster from "cluster";
import { cpus } from 'os';
import db from "./app/config/db.js";
import app from "./app.js";
const numCpus = cpus().length;
if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
    for (let i = 0; i < numCpus; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
}
else {
    app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Received request at /"); // Add this line
        try {
            yield db.sequelize.authenticate();
            console.log("connection success");
            res.status(200).send({
                message: "Connected successfully"
            });
        }
        catch (err) {
            console.error("Could not connect to the database:", err.message); // Log the error message
            res.status(500).send({ message: `Could not connect to the database : ${err.message}` });
        }
    }));
    const PORT = process.env.PORT || 8081;
    app.listen(PORT, () => {
        console.log(`Server is running on : ${PORT}`);
    });
}
//# sourceMappingURL=server.js.map