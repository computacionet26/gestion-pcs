# Gestion PCS - Cliente

El cliente esta construido usando Vite como empaquetador, React como framework para hacer una aplicacion SPA y Tailwind como framework de estilos.

## Instrucciones

Primero hay que instalar los modulos de node, usar el comando:
```
npm install
```

Esta opcion es opcional, se usario cuando se quiere hacer un cambio en el proyecto y verlo en tiempo real, una vez instalados los modulos de node, podemos abrir la aplicacion en un puerto:
```
npm run dev
```

Y para construir la aplicacion a archivos estaticos para desplejarlos en un servidor http:
```
npm run build
```
los archivos estaticos se crearan en una carpeta llamada "build" o "dist" dentro de la carpeta.

Información para instalar http-server
```
https://www.npmjs.com/package/http-server
```

Para correr el servidor desde la carpeta root ejecutar 
```
http-server ./dist
```

Datos complementarios
```
Crear .env.local en client
VITE_API_URL="http://10.120.3.179:3000"
```

 

