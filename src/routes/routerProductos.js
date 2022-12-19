import { Router } from "express";
import config from "../../config.js"
import ContainerSQL from "../containers/ContainerSQL.js";

const routerProductos = new Router()

const containerProductos = new ContainerSQL(config.mariaDb, 'productos')


//POST

routerProductos.post("/", async (req,res)=>{
    try {
        const producto = req.body
        const ids = containerProductos.guardar(producto)
        res.json(ids)
    } catch (error) {
        res.send(`Error en la DB ${error}`)    }
})

//READ

routerProductos.get("/", async (req,res)=>{
    try {
        const productos = await containerProductos.listarAll()
        res.json(productos)

    } catch (error) {
        res.send(`Error en la DB ${error}`)
    }
})

//READ (id)

routerProductos.get("/:id", async (req,res)=>{
    try {
        const id = parseInt(req.params.id)
        const productos = await containerProductos.listar(id)
        res.json(productos)

    } catch (error) {
        res.send(`Error en la DB ${error}`)    }
})

//PUT

routerProductos.put("/:id", async (req,res)=>{
    try {
        const id = Number(req.params.id)
        const newProducto = req.body

        const productoActualizado = await containerProductos.actualizar(id, newProducto)
        res.json(productoActualizado)
    } catch (error) {
        res.send(`Error en la DB ${error}`)}
})

//DELETE

routerProductos.delete("/:id", async (req,res)=>{
    try {
        const id = Number(req.params.id)

        await containerProductos.borrar(id)
        res.send("Producto borrado correctamente")
    } catch (error) {
        res.send(`Error en la DB ${error}`)    }
})

export default routerProductos