import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import passport from "passport";

export const CreateUserRouter = ({ UserModel }) => {
    const userRouter = Router();
    const userController = new UserController({ UserModel });
    userRouter.get("/:id?", userController.get);
    userRouter.patch("/add_fav/:id", userController.addFavPatch);
    userRouter.patch("/remove_fav/:id", userController.removeFavPatch);
    function isLoggedIn(req, res, next){
        console.log(req.user);
        req.user ? next() : res.sendStatus(401)
      }
    userRouter.get("/inicio", (req, res) => {
        res.sendFile("../../index.html");
    });
    userRouter.get('/auth/google',
      passport.authenticate('google', { scope:
          [ "email",'profile' ] }
    ));
    userRouter.get( '/auth/google/callback',
        passport.authenticate( 'google', {
            successRedirect: '/auth/google/success',
            failureRedirect: '/auth/google/failure'
    }));
    userRouter.get("/auth/google/success",isLoggedIn, (req, res) => {
      res.json(req.user)
    })
    userRouter.get("/auth/google/failure", (req, res) => {
      res.send("Error")
    })
    userRouter.get('/auth/logout', (req, res, next) => {
      req.logOut((error) => {
        if(error){ return next(error)}
      });
      res.clearCookie("connect.sid")
      res.redirect('/inicio');
    });
    return userRouter
}