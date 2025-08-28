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
    const { title, year, genre, platform, price } = req.body;
    await gameService.Create(title, year, genre, platform, price);
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
    if(ObjectId.isValid(req.params.id)){
      const id = req.params.id
      const {title, year, genre, platform, price} = req.body
      await gameService.Update(id, title, year, genre, platform, price)
      res.sendStatus(200) // Cód 200 (OK)
    } else {
      res.sendStatus(400) // Cód 400 (BAD REQUEST)
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export default { getAllgames, createGame, deleteGame, updateGame };
