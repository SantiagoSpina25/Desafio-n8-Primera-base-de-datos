import knexConnection from "../options/knexConnection.js";

( async () => {
    
    try {
        console.log("Comenzando script migrate...")
        await knexConnection.schema.dropTableIfExists("productos");
        await knexConnection.schema.dropTableIfExists("mensajes");

        // Mensajes
        
        await knexConnection.schema.createTable("mensajes", (table)=>{
            table.increments("id").primary();
            table.string("usuario").notNullable();
            table.string("mensaje").notNullable();
        })
        
        // Productos
        
        await knexConnection.schema.createTable("productos", (table) => {
            table.increments("id").primary();
            table.string("nombre").notNullable();
            table.integer("precio").notNullable();
            table.string("thumbnail").notNullable();
            table.string("category").notNullable();
            table.integer("stock").notNullable();

        })
    } 
    catch (error) {
        console.log(error.message);
    }
    finally {
        knexConnection.destroy();
        console.log("Finalizando script migrate...")
    }
} 


)()

