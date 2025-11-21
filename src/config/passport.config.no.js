import passport from "passport";
import local from "passport-local";
import userModel from "../dao/models/user.model.js";
import cartModel from "../dao/models/cart.model.js";
import { createHash, isValidPassword } from "../utils/index.js";
import jwt from "passport-jwt";
import config from "./config.js";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtractor = req =>
    req?.cookies ? req.cookies["authCookie"] : null;

const initializePassport = () => {

    /* REGISTER */
    passport.use(
        "register",
        new LocalStrategy(
            { passReqToCallback: true, usernameField: "email" },
            async (req, email, password, done) => {
                const { first_name, last_name, age } = req.body;

                try {
                    const userFound = await userModel.findOne({ email });
                    if (userFound) return done(null, false);

                    const newCart = await cartModel.create({ products: [] });

                    const newUser = await userModel.create({
                        first_name,
                        last_name,
                        age,
                        email,
                        password: createHash(password),
                        cart: newCart._id
                    });

                    return done(null, newUser);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    /* LOGIN */
    passport.use(
        "login",
        new LocalStrategy(
            { usernameField: "email" },
            async (email, password, done) => {
                try {
                    const user = await userModel.findOne({ email });
                    if (!user) return done(null, false);

                    if (!isValidPassword(password, user))
                        return done(null, false);

                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    /* JWT */
    passport.use(
        "jwt",
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
                secretOrKey: config.JWT_SECRET,
            },
            async (jwt_payload, done) => {
                return done(null, jwt_payload);
            }
        )
    );
};

export default initializePassport;