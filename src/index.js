import express from 'express';
import { engine } from 'express-handlebars';
import { join, __dirname } from './utils/index.js';
//import mongoose from 'mongoose';
//import session from 'express-session';
import cookieParser from 'cookie-parser';
//import createFileStore from 'session-file-store';
//import MongoStore from 'connect-mongo';
import passport from "passport";
import methodOverride from 'method-override';
import usersRoutes from './routes/user.router.js';
import userRoutes from './routes/session.routes.js';
import viewRoutes from './routes/views.routes.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from "./routes/carts.routes.js";
import ticketRouter from "./routes/ticket.routes.js";
import initializePassport from './config/passport.config.js';
import conectarDB from './config/db.js';
import config from './config/config.js';

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", join(__dirname, "views"));


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "../public")));
app.use(cookieParser())
app.use(methodOverride("_method"));

const midDate = (req, res, next) => {
    console.log(
    `Este middleware muestra la fecha ${new Date().toLocaleDateString()}`
    );
    next();
};

initializePassport()
app.use(passport.initialize())

app.get("/", midDate, (req, res) => {
  res.render("home", { title: "HOME" });
});
app.use("/api/sessions", userRoutes);
app.use("/", viewRoutes);

app.use('/api/users', usersRoutes);

app.use('/api/products', productsRouter);

app.use("/api/carts", cartsRouter);

app.use("/api/tickets", ticketRouter);

app.use((req, res, next) => {
    res.status(404).send("Pagina no encontrada");
});

conectarDB(config.MONGO_URL, config.DB_NAME);
app.listen(config.PORT, () => {
    console.log(`Server on port ${config.PORT}`)
});