export class UserController {
    constructor({ UserModel }){
        this.UserModel = UserModel
    }

    get = async (req, res) => {
        try {
            const { id } = req.params;
            if(id){
                const user = await this.UserModel.getById({ id })
                return res.status(200).json(user)
            } else {
                const users = await this.UserModel.getAll()
                return res.status(200).json(users)
            }
        } catch (error) {
            res.status(400).json({error: "Error del modelo", message: error.message})
        }
    }

    addFavPatch = async (req, res) => {
        try {
            const { id } = req.params
            const { heroId } = req.query
            const user = await this.UserModel.addFav({ id, heroId })
            res.status(201).json(user)
        } catch (error) {
            res.status(400).json({error: "Error del modelo", message: error.message})
        }
    }

    removeFavPatch = async (req, res) => {
        try {
            const { id } = req.params
            const { heroId } = req.query
            const user = await this.UserModel.removeFav({ id, heroId })
            res.status(201).json(user)
        } catch (error) {
            res.status(400).json({error: "Error del modelo", message: error.message})
        }
    }
}