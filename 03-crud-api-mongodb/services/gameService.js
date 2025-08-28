import Game from "../models/Games.js";

// O service sera responsavel por conter os metodos de manipulação do banco.

class gameService {
  //Buscando os registros do banco
  async getAll() {
    try {
      const games = await Game.find();
      return games;
    } catch (error) {
      console.log(error);
    }
  }
  // Cadastrando registros no banco
  async Create(title, year, genre, platform, price) {
    try {
      const newGame = new Game({
        title,
        year,
        genre,
        platform,
        price,
      });
      await newGame.save();
    } catch (error) {
      console.log(error);
    }
  }

  //Deletando registros no banco
  async Delete(id) {
    try {
      await Game.findByIdAndDelete(id);
      console.log(`Game com a id: ${id} foi deletado com sucesso.`);
    } catch (error) {
      console.log(error);
    }
  }

  //Alterando registros no banco
  async Update(id, title, year, genre, platform, price) {
    try {
      await Game.findByIdAndUpdate(id, {
        title,
        year,
        genre,
        platform,
        price,
      });
      console.log(`Dados do game com id ${id} alterado com sucesso.`);
    } catch (error) {
      console.log(error);
    }
  }
}
export default new gameService();
