# Around the U.S. Back End 🗺️​
  
### Descripción general ⚙️
  
Este repositorio contiene un proyecto de backend desarrollado en Node.js utilizando el framework Express.js. El proyecto consta de dos rutas, cards y users, las cuales retornan información almacenada en archivos JSON. Además, se utiliza ESLint como herramienta de linting y nodemon para refrescar el servidor automáticamente durante el desarrollo.

### Dependencias 🔗

El proyecto utiliza las siguientes dependencias:

| Paquete | Version     |
| :-------- | :------- | 
| `mongoose` | `^7.0.4` | 
| `express` | `^4.18.2` | 
| `eslint` | `^8.38.0` | 
| `eslint-config-airbnb-base` | `^15.0.0` |
| `nodemon` | `^2.0.22` | 
| `bcryptjs` | `^2.4.3` | 
| `celebrate` | `^15.0.1` | 
| `cors` | `^2.8.5` | 
| `express-winston` | `^4.2.0` | 
| `winston` | `^3.8.2` | 
| `jsonwebtoken` | `^9.0.0` | 
| `validator` | `^13.9.0` | 

Estas dependencias se encuentran listadas en el archivo package.json.

### Caracteristicas del Proyecto 💻

- Solicitudes del servidor
- Manejo de errores
- Archivos de enrutamiento
- Esquemas para los datos
- Validaciones con Expresiones Regulares

### Funcionalidades ✅

- Obtener todos los usuarios
- Obtener un usuario por su ID
- Obtener todas las publicaciones
- Publicar una foto
- Actualizar el perfil y el avatar
- Eliminar una publicación
- Dar o quitar "like" a una publicación

### Peticiones 📬

`GET /users/id` — Retorna el usuario filtrado por un id

`GET /users/id` — Crea un nuevo usuario y lo retorna

`PATCH /users/me` — Actualiza el perfil del usuario y lo retorna actualizado

`PATCH /users/me/avatar` — Actualiza la foto de perfil del usuario y lo retorna actualizado

`GET /cards` — Retorna todas las publicaciones

`POST /cards` — Crea una publicación y la retorna

`DELETE /cards/cardId` — Elimina una publicación mediante un id

`PUT /cards/cardId/likes` — Agrega un like a la publicación y retorna la publicación actualizada

`DELETE /cards/cardId/likes` — Elimina un like de la publicación y retorna la publicación actualizada

### Directorios 📖

`/data` — JSON files to temporarily emulate database integration. Archivos JSON temporales para simular una base de datos
  
`/routes` — Archivo de rutas.  

`/controllers` — Archivo de controladores de response y request. 

`/models` — Esquemas de los documentos de mongoDB.  

### Scripts 🔍
  
`npm run start` — para iniciar el servidor.  
  
`npm run dev` — para iniciar el servidor con hot reload habilitado.  

