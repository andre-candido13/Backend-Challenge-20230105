import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRouter from "./routers/products-router";
import { importData } from "./controllers/products-controller";
import { handleApplicationErrors } from "./middleware/error-middlwware";




dotenv.config()


import * as cron from 'node-cron'

cron.schedule('59 12 27 11 *', async () => {
  await importData()
  .then(() => {
    console.log('Importação concluída com sucesso!');
  })
  .catch((error) => {
    console.error('Erro durante a importação:', error.message);
  });
});


const server = express()
server.use(cors())
server.use(express.json())

//routes
server.use(productRouter)
server.use(handleApplicationErrors)






server.listen(5000, () => console.log("Servidor ON na porta", + 5000))