FROM node:16-alpine3.15

WORKDIR /app

COPY package*.json ./
COPY .env ./
COPY prisma ./prisma/

RUN npm install
RUN npm run prisma

COPY . .

EXPOSE 3000

CMD ["npm", "start"]