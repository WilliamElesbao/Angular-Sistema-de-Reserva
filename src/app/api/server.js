import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./sectors-routes.js";

const app = express();
const port = 3001;

const sectors = '/api/sectors';

app.use(cors());
app.use(bodyParser.json());

// Rotas para operações CRUD

app.use(`${sectors}`, router);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}${sectors}`);
});
