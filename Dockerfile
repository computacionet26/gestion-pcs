FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
COPY .env ./
COPY prisma ./prisma/

RUN npm install
RUN npm run prisma

COPY . .

CMD ["npm", "start"]