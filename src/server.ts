import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRouter from "./routers/products-router.js";



dotenv.config()

import * as cron from 'node-cron'

cron.schedule('5 4 * * *', () => {
  console.log('running a task every minute');
});


const server = express()
server.use(cors())
server.use(express.json())

//routes
server.use(productRouter)




server.listen(5000, () => console.log("Servidor ON na porta", + 5000))