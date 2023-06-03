import express from "express";
import routes from './routes.js'
import cors from 'cors'
const app = express()

app.use(cors());

const corsOptions = {
  origin: 'http://localhost:8100',
};
app.use(cors(corsOptions));

app.use(express.json())
app.use(routes)

app.listen("3000", () => console.log("Servidor rodando na porta 3000"));
