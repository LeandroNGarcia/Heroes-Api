import { Router } from "express";
import { HeroController } from "../controllers/HeroController.js";

export const CreateHeroRouter = ({ HeroModel }) => {
    const heroRouter = Router()
    const heroControl = new HeroController({ HeroModel });
    heroRouter.get("/:id?", heroControl.get)
    heroRouter.post("/", heroControl.post)
    heroRouter.patch("/", heroControl.patchHero)
    heroRouter.patch("/add-power", heroControl.addPower)
    heroRouter.patch("/remove-power", heroControl.removePower)
    return heroRouter
}