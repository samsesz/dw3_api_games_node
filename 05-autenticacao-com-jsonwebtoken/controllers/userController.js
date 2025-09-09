import userService from "../services/userService.js";
// Importando jwt
import jwt from 'jsonwebtoken'
// segredo para o token(é recomendado que o segredo esteja nas variaveis de ambiente)
const jwtSecret = 'apithegames'

//Função para CADASTRAR um usuario
const createUser = async (req, res) => {
  try {
    //Coletando os dados do corpo da requisição
    const { name, email, password } = req.body;
    await userService.Create(name, email, password);
    res.status(201).json({ success: "Usuario cadastrado com sucesso" }); // cod.201 CREATED
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

//Função para realizar LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Buscando o usuario pelo email
    const user = await userService.getOne(email);
    // se o usuario for encontrado
    if (user != undefined) {
      // fazendo a validação da senha (senha correta)

      if (user.password == password){
        // gerando o token com jwt
        jwt.sign({id: user.id, email: user.email}, jwtSecret, {expiresIn: '48h'}, (error, token) => {
          if (error) {
            res.status(400).json({error: 'Nao foi possivel gerar o token de autenticação'})
          } else {
            // token gerado com sucesso
            res.status(200).json({token})
          }
        })
        // senha incorreta
      } else {
        res.status(401).json({error: 'credenciais invalidas'}) // cod. 401: unauthorized
      }
    } else {
      res.status(404).json({ error: "Usuario nao encontrado" });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export default { createUser, loginUser, jwtSecret };
