import express from 'express';
const gameRoutes = express.Router();
import gameController from '../controllers/gameController.js';

// A camada de routes sera responsavel por conter os ENDPOINTS da API 

// ENDPOINT para LISTAR
gameRoutes.get("/games", gameController.getAllgames);

//ENDPOINT para CADASTRAR
gameRoutes.post("/games", gameController.createGame);

export default gameRoutes;