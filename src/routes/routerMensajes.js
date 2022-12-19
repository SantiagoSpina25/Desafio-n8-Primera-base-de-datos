import { Router } from "express";
import config from "../../config.js"
import ContainerSQL from "../containers/ContainerSQL.js";

const routerMensajes = new Router()
const containerMensajes = new ContainerSQL(config.sqlite3, 'mensajes')


//POST

routerMensajes.post("/", async (req,res)=>{
    try {
        const mensaje = req.body
        const ids = containerMensajes.guardar(mensaje)
        res.json(ids)
    } catch (error) {
        res.send(`Error en la DB ${error}`)    }
})

//READ

routerMensajes.get("/", async (req,res)=>{
    try {
        const mensajes = await containerMensajes.listarAll()
        res.json(mensajes)

    } catch (error) {
        res.send(`Error en la DB ${error}`)
    }
})

//READ (id)

routerMensajes.get("/:id", async (req,res)=>{
    try {
        const id = parseInt(req.params.id)
        const mensajes = await containerMensajes.listar(id)
        res.json(mensajes)

    } catch (error) {
        res.send(`Error en la DB ${error}`)    }
})

//PUT

routerMensajes.put("/:id", async (req,res)=>{
    try {
        const id = Number(req.params.id)
        const newMensaje = req.body

        const mensajeActualizado = await containerMensajes.actualizar(id, newMensaje)
        res.json(mensajeActualizado)
    } catch (error) {
        res.send(`Error en la DB ${error}`)}
})

//DELETE

routerMensajes.delete("/:id", async (req,res)=>{
    try {
        const id = Number(req.params.id)

        await containerMensajes.borrar(id)
        res.send("Producto borrado correctamente")
    } catch (error) {
        res.send(`Error en la DB ${error}`)    }
})

export default routerMensajes