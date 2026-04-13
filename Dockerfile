FROM node:20-alpine3.18
WORKDIR /usr/local/apps/myapp

COPY package.json ./
RUN npm install && npm cache clean --force

COPY tsconfig.json ./

COPY src ./src
COPY public ./public
COPY astro.config.mjs ./
COPY .env ./

EXPOSE ${PORT}

RUN npm run build