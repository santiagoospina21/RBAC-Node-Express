const mongoose = require("mongoose");

// URL de conexión a la base de datos
const dbURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/RBACdb";

// Configuración de la conexión
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Eventos de la conexión
mongoose.connection.on("connected", () => {
  console.log(`Conectado a la base de datos en ${dbURI}`);
});

mongoose.connection.on("error", (err) => {
  console.error(`Error de conexión a la base de datos: ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Desconectado de la base de datos");
});

// Manejar la terminación de la aplicación
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Conexión a la base de datos cerrada debido a la terminación de la aplicación"
    );
    process.exit(0);
  });
});

module.exports = mongoose.connection;
