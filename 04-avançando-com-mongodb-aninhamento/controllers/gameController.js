import gameService from "../services/gameService.js";
import { ObjectId } from "mongodb";

// função para listar jogos
const getAllgames = async (req, res) => {
  try {
    const games = await gameService.getAll();
    // Cod. 200 (OK) requisição feita com sucesso
    res.status(200).json({ games: games });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

//Função para CADASTRAR jogos
const createGame = async (req, res) => {
  try {
    const { title, year, price, descriptions } = req.body;
    await gameService.Create(title, year, price, descriptions);
    res.sendStatus(201); // Cód 201 (CREATED) : Recurso criado
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

//Função para DELETAR jogos
const deleteGame = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await gameService.Delete(id);
      res.sendStatus(204); // Cód 204 (NO CONTENT): Requisição bem sucedida, mas não há conteudo para retornar
    } else {
      // Se o id não for valido
      res.status(400).json({ error: "A ID enviada é invalida" });
      // Cód 400 (BAD REQUEST) - Requisição mal formada
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
    // res.status(500).json({ error: 'Erro interno do servidor'}) -> Para enviar json junto
    // res.sendStatus(500) -> Somente o codigo de status
  }
};

//Função para ALTERAR jogos
const updateGame = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const { title, year, price, descriptions } = req.body;
      const game = await gameService.Update(id, title, year, price, descriptions);
      res.status(200).json({game}); // Cód 200 (OK)
    } else {
      res.sendStatus(400); // Cód 400 (BAD REQUEST)
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Função de buscar um unico jogo
const getOneGame = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id
      const game = await gameService.getOne(id);
      if (!game) { // if not game
        res.status(404).json({ error: 'O jogo nao foi encontrado.'}) // Not Found: Não encontrado
      } else {
        res.status(200).json({ game })
      }
    } else {
      res.status(400).json({ error: 'A id enviada é invalida'}) // Bad Request: Requisição invalida
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500); // Erro interno do servidor
  }
};

export default { getAllgames, createGame, deleteGame, updateGame, getOneGame };
