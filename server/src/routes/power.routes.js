import { Router } from "express";
import { PowerController } from "../controllers/PowerController.js";

export const CreatePowerRouter = ({ PowerModel }) => {
    const powerRouter = Router()
    const powerControl = new PowerController({ PowerModel })
    powerRouter.get("/:id?", powerControl.get)
    powerRouter.post("/", powerControl.post)
    return powerRouter
}