import jwt from "jsonwebtoken";
import userController from "../controllers/userController.js";

// Função de autenticação para verificar se o usuario esta enviando o token e se ele é valido
const Authorization = (req, res, next) => {
  const authToken = req.headers["authorization"];
  if (authToken != undefined) {
    next();
  } else {
    res.status(401).json({ error: "token invalido" });
  }
};

export default { Authorization };
