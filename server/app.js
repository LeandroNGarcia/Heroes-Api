import Express from "express";
import session from "express-session"
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import "./src/auth.js"
import { CreateHeroRouter } from "./src/routes/hero.routes.js";
import { CreatePowerRouter } from "./src/routes/power.routes.js";
import { CreateUserRouter } from "./src/routes/user.routes.js";
import passport from "passport";
dotenv.config();

export const CreateApp = ({ HeroModel, PowerModel, UserModel }) => {
  const app = Express();
  app.use(Express.json());
  app.disable("x-powered-by");
  app.use(cors());
  app.use("/hero", CreateHeroRouter({ HeroModel }));
  app.use("/power", CreatePowerRouter({ PowerModel }));
  app.use("/user", CreateUserRouter({ UserModel }));
  app.use(session({
    secret: 'my_project_new_demo',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false},
  }));
  // Middleware de passport para inicializar la sesión
  app.use(passport.initialize());
  app.use(passport.session());

  const port = process.env.PORT;
  app.listen(port, () => {
    console.log("server running on port " + port);
  });
};
