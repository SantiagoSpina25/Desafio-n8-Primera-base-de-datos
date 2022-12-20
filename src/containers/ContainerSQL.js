import knexConnection from "../options/knexConnection.js"

import knex from "knex"

class ContainerSQL {
    
    constructor(config, tabla) {
        this.knex = knex(config)
        this.tabla = tabla
    }

    //Crear producto/mensaje

    async guardar(elem){
        const ids = await knexConnection(this.tabla).insert(elem)
        return ids
    }

    //Leer productos/mensajes

    async listarAll(){
        return knexConnection(this.tabla).select("*");
    }

    //Leer un producto/mensaje por su id

    async listar(id){
        return knexConnection(this.tabla).where("id", id).select("*"); 
    }

    //Actualizar un producto/mensaje

    async actualizar(id, elem){
        return knexConnection(this.tabla).where("id", id).update(elem);
    }


    //Borrar un producto/mensaje por su id

    async borrar(id){
        return knexConnection(this.tabla).where("id", id).del(); 
    }
}

export default ContainerSQL