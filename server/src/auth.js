import passport from "passport";
import { prisma } from "./db.js";
import GoogleStrategy from "passport-google-oauth2";
import dotenv from "dotenv"
dotenv.config()

passport.serializeUser(function (user, done) {
  done(null, user.googleId);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        googleId: id,
      },
      include:{
        favoritesHeroes: true
      }
    });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID:process.env.CLIENT_AUTH,
      clientSecret: process.env.SECRET_AUTH,
      callbackURL: "http://localhost:3001/auth/google/callback",
      passReqToCallback   : true
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        let user = await prisma.user.findFirst({
          where: {
            email: profile.email,
          },
          include: {
            favoritesHeroes: true,
          },
        });
        if (!user) {
          user = await prisma.user.create({
            data: {
              email: profile.email,
              name: profile.given_name,
              verified: true,
            },
            include: {
              favoritesHeroes: true,
            },
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
