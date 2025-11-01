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
import productsRoutes from './routes/product.router.js';
import initializePassport from './config/passport.config.js'
import conectarDB from './config/db.js';
import config from './config/config.js';

const app = express();


//settings
//app.set('PORT', config.PORT);
//const FileStore = createFileStore(session);
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", join(__dirname, "views"));

// const connectDB = async () => {
//     try {
//         await mongoose.connect('mongodb+srv://MigliavaccaEzequiel:Emin3mToy@cluster0.p8r2cxn.mongodb.net/Backend2?retryWrites=true&w=majority&appName=Cluster0')
//         console.log('Conexion a DB exitosa');
//     } catch (error) {
//         console.error('Error de conexion', error.message);
//     }
// }

//middlewares (Van antes de la ruta principal y llevan (req, res, next))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "../public")));
app.use(cookieParser())
// app.use(session({
//     store: new FileStore({ path:'./sessions', ttl: 15, retries: 0 }),
//     secret,
//     resave: false,
//     saveUninitialized: false,
// }))
// app.use(session({
//     store: MongoStore.create({
//         mongoUrl: config.MONGO_URL,
//         dbName: config.DB_NAME,
//         ttl: 300,
//     }),
//     secret,
//     resave: false,
//     saveUninitialized: false
// }))
app.use(methodOverride("_method"));

const midDate = (req, res, next) => {
    console.log(
    `Este middleware muestra la fecha ${new Date().toLocaleDateString()}`
    );
    next(); //esto hace que pase al siguiente y no quede "colgado" en este mid
};

// passport
initializePassport()
app.use(passport.initialize())
//app.use(passport.session())

//route
// app.get("/", midDate, (req, res) => {
//     res.send('Hola ¿Que tal?');
// });

app.get("/", midDate, (req, res) => {
  res.render("home", { title: "HOME" });
});
app.use("/api/sessions", userRoutes);
app.use("/", viewRoutes);



app.use('/api/users', usersRoutes);
// app.get('/login', (req, res)=>{
//     const user = req.query.user
//     req.session.user = user
//     res.redirect('/user')
// });
// app.get('/user', (req, res) => {
//     if(req.session.user){
//         return res.send(`El usuario logueado es: ${req.session.user}`);
//     }
//     res.send("No hay usuario logueado");
// });

app.use('/api/products', productsRoutes);

//middlewares de manejo de errores van al final
app.use((req, res, next) => {
    res.status(404).send("Pagina no encontrada");
});

//listeners
conectarDB(config.MONGO_URL, config.DB_NAME);
app.listen(config.PORT, () => {
    console.log(`Server on port ${config.PORT}`)
});