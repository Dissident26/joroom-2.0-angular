FROM node:19.7.0-bullseye-slim

RUN npm install -g pnpm

WORKDIR /app

COPY ./package.json ./pnpm-lock.yaml /app/

RUN pnpm install

COPY . .

ENTRYPOINT [ "pnpm", "dev" ]