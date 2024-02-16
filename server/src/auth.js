import passport from "passport";
import { prisma } from "./db.js";
import GoogleStrategy from "passport-google-oauth2";

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
      clientID:
        "59030248795-k9vjmmf95onr05p7idgl1lk775qijtst.apps.googleusercontent.com",
      clientSecret: "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",
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
