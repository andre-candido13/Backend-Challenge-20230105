import express from "express";
import cors from "cors";
import dotenv from "dotenv";



dotenv.config()

const server = express()
server.use(cors())
server.use(express.json())

//routes
//server.use(userRouter)




server.listen(5000, () => console.log("Servidor ON na porta", + 5000))