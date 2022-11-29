# Gestions PCS - API Rest

Diagrama de la base de datos:
https://dbdiagram.io/d/632c58307b3d2034ff8d3d47

La api esta construida con Express.js, un framework de Nodejs para backend, usando Prisma.js como ORM, Zod para validar las peticiones http y bcryptjs para encriptar las contrañas.

## Instrucciones

Primero hay que establecer las variables de entorno en el archivo ".env".

Luego hay que instalar los modulos de node, usando el comando:
```
npm install
```

Luego migramos y construimos la base de datos usando el comando (los datos para la conexion a la base de datos tienen que estar en las variables de entorno):
```
npm run prisma
```

Y para inciar la aplicaicon hay que usar el comando (la api se abrira en el puerto especificado en las variables de entorno, y si esta no esta establedica, de abrira en el puerto "3000"):
```
npm start
```
