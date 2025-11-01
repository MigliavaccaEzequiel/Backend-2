import mongoose from "mongoose";

const conectarDB = async (url, dbName)=>{
    try {
        await mongoose.connect(
            url,
            {
                dbName
            }
        )

        console.log (`DB online: ${dbName}`)
    } catch (error) {
        console.log(`Error al conectar a DB: ${error.message}`)
        process.exit()
    }
}

export default conectarDB;