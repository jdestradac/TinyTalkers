# Utilizar una imagen base oficial de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de configuración y dependencias
COPY package.json package-lock.json ./ 

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Crear la aplicación para producción
RUN npm run build

# Exponer el puerto en el que Next.js ejecuta el servidor
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]
