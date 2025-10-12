import express from 'express';
import mongoose from 'mongoose';
import usersRoutes from './routes/user.router.js'
import productsRoutes from './routes/product.router.js'

const app = express();

app.use(express.json())

//settings
app.set('PORT', 3000)

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://MigliavaccaEzequiel:Emin3mToy@cluster0.p8r2cxn.mongodb.net/Backend2?retryWrites=true&w=majority&appName=Cluster0')
        console.log('Conexion a DB exitosa');
    } catch (error) {
        console.error('Error de conexion', error.message);
    }
}

//middlewares (Van antes de la ruta principal y llevan (req, res, next))
const midDate = (req, res, next) => {
    console.log(
    `Este middleware muestra la fecha ${new Date().toLocaleDateString()}`
    );
    next(); //esto hace que pase al siguiente y no quede "colgado" en este mid
};

//route
app.get("/", midDate, (req, res) => {
    res.send('Hola ¿Que tal?');
});

app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);

//middlewares de manejo de errores van al final
app.use((req, res, next) => {
    res.status(404).send("Pagina no encontrada");
});

//listeners
connectDB();
app.listen(app.get('PORT'), () => {
    console.log(`Server on port ${app.get('PORT')}`)
});