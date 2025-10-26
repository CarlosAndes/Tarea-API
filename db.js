import mysql from "mysql2";

const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",       // tu usuario de MySQL
  password: "",       // tu contraseña (si tienes)
  database: "usuarios_db", // tu base de datos
});

conexion.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar a la base de datos:", err);
    return;
  }
  console.log("✅ Conectado a la base de datos MySQL");
});

export default conexion;
