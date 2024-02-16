export class PowerController {
    constructor({ PowerModel }){
        this.PowerModel = PowerModel;
    }

    get = async (req, res) => {
        try {
            const { id } = req.params
            if(id){
                const power = await this.PowerModel.getById({ id: Number(id) })
                return res.status(200).json(power)
            } else {
                const powers = await this.PowerModel.getAll()
                return res.status(200).json(powers)
            }
        } catch (error) {
            res.status(400).json({error: "Error Model", message: error.message})
        }
    }

    post = async (req, res) => {
        try {
            const { name } = req.body
            const power = await this.PowerModel.create({ name })
            return res.status(200).json(power)
        } catch (error) {
            res.status(400).json({error: "Error Model", message: error.message})
        }
    }
}