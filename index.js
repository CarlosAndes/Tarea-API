import express from "express";
import mysql from "mysql2";

const app = express();
app.use(express.json());

// 🔹 Conexión a MySQL
const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",        // tu usuario de MySQL
  password: "",        // tu contraseña (si tienes)
  database: "usuarios_db", // tu base de datos
});

conexion.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar a la base de datos:", err);
    return;
  }
  console.log("✅ Conectado a la base de datos MySQL");
});

// 🔹 Página principal con estilos incluidos
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Login y Registro</title>
        <style>
          body {
            font-family: 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #141E30, #243B55);
            color: white;
            text-align: center;
            margin: 0;
            padding: 0;
          }

          h1 {
            margin-top: 40px;
            font-size: 2em;
            color: #00c3ff;
          }

          button {
            background-color: #00c3ff;
            color: white;
            border: none;
            border-radius: 10px;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            margin: 10px;
            transition: 0.3s;
          }

          button:hover {
            background-color: #0078a8;
          }

          input {
            width: 250px;
            padding: 10px;
            border: none;
            border-radius: 8px;
            margin: 5px;
            font-size: 15px;
          }

          #formulario {
            background-color: rgba(255, 255, 255, 0.1);
            width: 350px;
            margin: 30px auto;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 0 10px rgba(255,255,255,0.2);
          }

          #mensaje {
            color: #ffcc00;
            font-size: 17px;
            font-weight: bold;
          }

          h3 {
            color: #00e0ff;
          }
        </style>
      </head>
      <body>
        <h1> Servidor funcionando correctamente</h1>
        <h2>Selecciona una opción:</h2>

        <button onclick="mostrarRegistro()">📝 Registrar usuario</button>
        <button onclick="mostrarLogin()">🔐 Iniciar sesión</button>

        <div id="formulario"></div>

        <script>
          function mostrarRegistro() {
            document.getElementById('formulario').innerHTML = \`
              <h3>Registrar usuario</h3>
              <input id="nombre" placeholder="Nombre" /><br/>
              <input id="correo" placeholder="Correo" /><br/>
              <input id="contrasena" placeholder="Contraseña" type="password" /><br/>
              <button onclick="registrar()">Registrar</button>
              <p id="mensaje"></p>
            \`;
          }

          function mostrarLogin() {
            document.getElementById('formulario').innerHTML = \`
              <h3>Iniciar sesión</h3>
              <input id="correoLogin" placeholder="Correo" /><br/>
              <input id="contrasenaLogin" placeholder="Contraseña" type="password" /><br/>
              <button onclick="login()">Iniciar sesión</button>
              <p id="mensaje"></p>
            \`;
          }

          function registrar() {
            const nombre = document.getElementById('nombre').value;
            const correo = document.getElementById('correo').value;
            const contrasena = document.getElementById('contrasena').value;

            fetch('/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ nombre, correo, contrasena })
            })
            .then(res => res.json())
            .then(data => document.getElementById('mensaje').innerText = data.message)
            .catch(err => console.error(err));
          }

          function login() {
            const correo = document.getElementById('correoLogin').value;
            const contrasena = document.getElementById('contrasenaLogin').value;

            fetch('/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ correo, contrasena })
            })
            .then(res => res.json())
            .then(data => {
              if (data.usuario) {
                document.getElementById('mensaje').innerHTML =
                  "✅ Bienvenido, <b>" + data.usuario.nombre + "</b><br>Correo: " + data.usuario.correo;
              } else {
                document.getElementById('mensaje').innerText = data.message;
              }
            })
            .catch(err => console.error(err));
          }
        </script>
      </body>
    </html>
  `);
});

// 🔹 Registro de usuario
app.post("/register", (req, res) => {
  const { nombre, correo, contrasena } = req.body;

  const sql = "INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)";
  conexion.query(sql, [nombre, correo, contrasena], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al registrar usuario" });
    }
    res.json({ message: "Usuario registrado con éxito ✅" });
  });
});

// 🔹 Login de usuario
app.post("/login", (req, res) => {
  const { correo, contrasena } = req.body;

  const sql = "SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?";
  conexion.query(sql, [correo, contrasena], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al iniciar sesión" });
    }

    if (results.length > 0) {
      res.json({ message: "Inicio de sesión exitoso ✅", usuario: results[0] });
    } else {
      res.status(401).json({ message: "Correo o contraseña incorrectos ❌" });
    }
  });
});

app.listen(3000, () => {
  console.log("🚀 Servidor corriendo en http://localhost:3000");
});
