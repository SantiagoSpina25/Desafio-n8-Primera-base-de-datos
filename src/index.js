import express from "express";

import config from "../config.js";
import knexConnection from "./options/knexConnection.js";
import ContainerSQL from "./containers/ContainerSQL.js";

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'


import routerProductos from "./routes/routerProductos.js"
import routerMensajes from "./routes/routerMensajes.js"

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const PORT = 8080

const containerProductos = new ContainerSQL(config.mariaDb, 'productos')
const containerMensajes = new ContainerSQL(config.sqlite3, 'mensajes')


io.on('connection', async socket => {
    console.log("Nuevo cliente conectado")

    //Productos

    const productos = knexConnection("productos").select("*")

    socket.emit("productsList", productos)

    socket.on("new product", data=>{
        containerProductos.guardar(data)

        io.sockets.emit('productsList', productos)
    })

    //Mensajes
    
    const mensajes = knexConnection("mensajes").select("*")

    socket.emit("mensajes", mensajes)

    socket.on("new message", data =>{
        containerMensajes.guardar(data)

        io.sockets.emit('mensajes', mensajes)
    })
});




app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


app.use("/api/productos", routerProductos)
app.use("/api/mensajes", routerMensajes)



const Server = httpServer.listen(PORT, () => {
    console.log(`Server running on Port ${Server.address().port}`)
})
Server.on('error', error => console.log(`Error en servidor ${error}`))
