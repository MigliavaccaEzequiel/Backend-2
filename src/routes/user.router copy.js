import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import { createHash } from "../utils/index.js";
//import userController from "../controllers/users.controller.js"

const router = Router();

//get
//router.get('/', userController.getUsers);
router.get('/', async ( req, res ) => {
    try {
        const users = await userModel.find();
        if (users.length === 0) {
            return res.status(404).json({ message: "No hay usuarios cargados" });
        };
        res.status(200).json({message:"Todos los usuarios", payload: users});    
    } catch (error) {
        console.error('No se pudieron cargar los usuarios', error.message);
        res.status(500).json({ message: "No se pudieron cargar los usuarios" });
    }
})

router.get('/:id', async ( req, res ) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json({message:"Usuario encontrado", payload: user});
    } catch (error) {
        console.error('Error al cargar el usuario', error.message);
        res.status(500).json({ message: "Error al cargar el usuario" })
    }
})

//post
router.post("/", async ( req, res ) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        if (!first_name || !last_name || !email || !age || !password) {
            return res.status(400).json({ message: "Faltan datos obligatorios" });
        }
        const newUser = await userModel.create({ first_name, last_name, email, age, password: createHash(password) });
        res.status(201).json({ message: "Usuario creado", payload: newUser});
    } catch (error) {
        console.error('No se pudo crear el usuario', error.message);
        res.status(500).json({ message: "No se pudo crear el usuario" });
    }
})

//put
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email, age } = req.body;
        const updatedUser = await userModel.findByIdAndUpdate(
            id, 
            { first_name, last_name, email, age }, 
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json({ message: "Usuario actualizado con éxito", payload: updatedUser });
    } catch (error) {
        console.error('Error al actualizar usuario:', error.message);
        res.status(500).json({ message: "No se pudo actualizar el usuario" });
    }
});

//delete
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await userModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json({ message: "Usuario eliminado con éxito", payload: deletedUser });
    } catch (error) {
        console.error('Error al eliminar usuario:', error.message);
        res.status(500).json({ message: "No se pudo eliminar el usuario" });
    }
});

export default router;