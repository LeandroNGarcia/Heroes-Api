export class HeroController {
  constructor({ HeroModel }) {
    this.HeroModel = HeroModel;
  }

  get = async (req, res) => {
    try {
      const { id } = req.params;
      if (id) {
        const hero = await this.HeroModel.getById({ id: Number(id) });
        return res.status(200).json(hero);
      } else {
        const heroes = await this.HeroModel.getAll();
        return res.json(heroes);
      }
    } catch (error) {
      res.status(400).json({ error: "Error Model", message: error });
    }
  };

  post = async (req, res) => {
    try {
      const { name, power } = req.body;
      const heroes = await this.HeroModel.post({ name, power });
      res.status(200).json(heroes);
    } catch (error) {
      res.status(400).json({ error: "Error Model", message: error });
    }
  };

  addPower = async (req, res) => {
    try {
      const { heroId, powerId } = req.body;
      const hero = await this.HeroModel.addPower({ heroId, powerId });
      res.status(200).json(hero);
    } catch (error) {
      res.status(400).json({ error: "Error Model", message: error });
    }
  };

  removePower = async (req, res) => {
    try {
      const { heroId, powerId } = req.body;
      const hero = await this.HeroModel.removePower({ heroId, powerId });
      res.status(200).json(hero);
    } catch (error) {
      res.status(200).json({ error: "Error Model", message: error });
    }
  };

  patchHero = async (req, res) => {
    try {
      const { id, name } = req.body;
      const hero = await this.HeroModel.update({ id, name });
      res.status(200).json(hero);
    } catch (error) {
      res.status(400).json({ error: "Error Model", message: error });
    }
  };
}
