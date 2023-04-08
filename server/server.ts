import cluster from "cluster";
import {cpus} from 'os'
import db from "./app/config/db.js";
import { Request, Response } from "express";
import app from "./app.js";


const numCpus = cpus().length;

if(cluster.isPrimary){
    console.log(`Primary ${process.pid} is running`);


    for(let i = 0; i< numCpus; i++){
        cluster.fork();
    }

    cluster.on('exit', (worker)=>{
        console.log(`Worker ${worker.process.pid} died`);
    });

}else{

app.get("/", async (req: Request, res: Response) => {
    console.log("Received request at /"); // Add this line
    try {
        await db.sequelize.authenticate();
        res.status(200).send({
            message: "Connected successfully"
        })

    } catch (err) {
        res.status(500).send({ message: `Could not connect to the database : ${err.message}` });
    }
})

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on : ${PORT}`);
})

}