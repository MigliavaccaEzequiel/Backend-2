import passport from "passport";
import local from "passport-local";
import userModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils/index.js";
import jwt, { ExtractJwt } from 'passport-jwt';
import config from "./config.js";

const JWTStrategy = jwt.Strategy,
ExtractJWT = jwt.ExtractJwt;
const JWT_SECRET = config.JWT_SECRET;

const cookieExtractor = (req) => {
  let token = null;
  if(req && req.cookies){
    token = req.cookies['authCookie'];
  }
  return token;
}

const LocalStrategy = local.Strategy;
const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          const userFound = await userModel.findOne({ email: username });
          if (userFound) {
            console.log("Usuario existente en la db");
            return done(null, false);
          }
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };
          const user = await userModel.create(newUser);
          return done(null, user);
        } catch (error) {
          return done(`Error al crear el usuario ${error}`, false);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey:JWT_SECRET
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initializePassport