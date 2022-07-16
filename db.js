const mongoose = require('mongoose')
const urlDB = 'mongodb://127.0.0.1:27017/TodoList'
module.exports = async () => {
    try{
        await mongoose.connect(urlDB, (error) => {
            if (error) throw error
            else{
                console.log("Conexión a BD exitosa!.");
            }
        })

    }
    catch (error) {
        console.log("Error al conectar a la BD", error)
    }
}