# Evidencia: GA7-220501096-AA5-EV01 - Diseño y desarrollo de servicios web

**Alumno:** Carlos Mario Osorio  
**Evidencia:** AA5-EV01

## Descripción
Proyecto simple de servicio web para **registro** e **inicio de sesión**, basado en Express y MySQL.  
Cumple los requisitos de la evidencia: recepción de usuario y contraseña, respuesta de autenticación satisfactoria o error, y código comentado.

## Estructura del proyecto
- index.js       -> Archivo principal (servidor + frontend de prueba)
- db.js          -> Conexión a MySQL
- package.json   -> Dependencias y script
- setup.sql      -> Script SQL para crear la base de datos y tabla
- .gitignore
- README.md

## Instrucciones para ejecutar localmente

1. Clonar o copiar el proyecto en su equipo.
2. Instalar dependencias:
```bash
npm install
```

3. la base de datos y tabla en MySQL (ejecutar `setup.sql`):
```sql
-- setup.sql
CREATE DATABASE IF NOT EXISTS usuarios_db;
USE usuarios_db;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  correo VARCHAR(100) UNIQUE,
  contrasena VARCHAR(100)
);

-- Usuario de ejemplo:
INSERT INTO usuarios (nombre, correo, contrasena) VALUES ('Carlos', 'carlos@gmail.com', '1111');
```

4. Ajustar datos de conexión en `db.js` (usuario y contraseña si es necesario).
5. Ejecutar:
```bash
node index.js
```

6. Abrir en el navegador: http://localhost:3000 y usar el formulario para registrar o iniciar sesión.

## Versionamiento (Git)
Ejemplo de comandos para versionar y subir a un repositorio remoto:

```bash
git init
git add .
git commit -m "Evidencia AA5-EV01: servicio registro y login"
# Crear repo en GitHub/GitLab y luego:
git remote add origin https://github.com/CarlosAndes/Tarea-API.git
git branch -M main
git push -u origin main
```
