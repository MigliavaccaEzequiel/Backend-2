import { Router } from "express";
import productModel from "../models/product.model.js";

const router = Router()

//get
router.get('/', async ( req, res ) => {
    try {
        const products = await productModel.find();
        if (products.length === 0) {
            return res.status(404).json({ message: "No hay productos cargados" });
        };
        res.status(200).json({message:"Todos los productos", payload: products});    
    } catch (error) {
        console.error('No se pudieron cargar los productos', error.message);
        res.status(500).json({ message: "No se pudieron cargar los productos" });
    }
})

router.get('/:id', async ( req, res ) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json({message:"Producto encontrado", payload: product});
    } catch (error) {
        console.error('Error al cargar el producto', error.message);
        res.status(500).json({ message: "Error al cargar el producto" })
    }
})

//post
router.post("/", async ( req, res ) => {
    try {
        const { name, code, price } = req.body;
        if (!name || !code || !price) {
            return res.status(400).json({ message: "Faltan datos obligatorios" });
        }
        const nerProduct = await productModel.create({ name, code, price });
        res.status(201).json({ message: "Producto creado", payload: nerProduct});
    } catch (error) {
        console.error('No se pudo crear el producto', error.message);
        res.status(500).json({ message: "No se pudo crear el producto" });
    }
})

//put
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, code, price } = req.body;
        const updatedProduct = await productModel.findByIdAndUpdate(
            id, 
            { name, code, price }, 
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json({ message: "Producto actualizado con éxito", payload: updatedProduct });
    } catch (error) {
        console.error('Error al actualizar producto:', error.message);
        res.status(500).json({ message: "No se pudo actualizar el producto" });
    }
});

//delete
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await userModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json({ message: "Producto eliminado con éxito", payload: deletedProduct });
    } catch (error) {
        console.error('Error al eliminar producto:', error.message);
        res.status(500).json({ message: "No se pudo eliminar el producto" });
    }
});

export default router;